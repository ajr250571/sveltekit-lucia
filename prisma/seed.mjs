// prisma/seed.mjs
import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

// Lee el archivo JSON
const authorsData = JSON.parse(fs.readFileSync(new URL('./libros.json', import.meta.url), 'utf-8'));

async function main() {
	console.log('Comenzando seed...');

	// Limpiamos las tablas existentes
	await prisma.book.deleteMany();
	await prisma.author.deleteMany();

	for (const authorData of authorsData.authors) {
		// Creamos el autor
		const author = await prisma.author.create({
			data: {
				name: authorData.name
			}
		});

		// Creamos los libros y los conectamos con el autor
		for (const bookTitle of authorData.books) {
			await prisma.book.create({
				data: {
					title: bookTitle,
					authors: {
						connect: {
							id: author.id
						}
					}
				}
			});
		}
	}

	console.log('¡Seed completado!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

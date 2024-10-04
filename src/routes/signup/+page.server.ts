// routes/signup/+page.server.ts
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import type { Actions } from './$types';
import { prisma } from '$lib/db.server';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const username = formData.get('username');
		const password = formData.get('password');
		if (
			typeof username !== 'string' ||
			username.length < 4 ||
			username.length > 20 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: 'Invalid UserName',
				code: 'INVALID_USERNAME'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 20) {
			return fail(400, {
				message: 'Invalid Password',
				code: 'INVALID_PASSWORD'
			});
		}

		const userId = generateIdFromEntropySize(10);

		const passwordHash = await hash(password, {
			// recommended minimum parameters
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await prisma.user.create({
			data: {
				id: userId,
				username: username,
				password_hash: passwordHash
			}
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};

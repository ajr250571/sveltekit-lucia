import { prisma } from '$lib/server';
import type { RequestHandler } from '@sveltejs/kit';
export const GET: RequestHandler = async () => {
	const users = await prisma.user.findMany({
		select: {
			id: true,
			username: true
		}
	});
	return Response.json(users);
};

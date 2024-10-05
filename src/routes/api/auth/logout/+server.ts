import type { RequestHandler } from './$types';
import { lucia } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request }) => {
	const authorizationHeader = request.headers.get('Authorization');
	const sessionId = lucia.readBearerToken(authorizationHeader ?? '');
	if (!sessionId) {
		return new Response(null, {
			status: 401
		});
	}
	const { user } = await lucia.validateSession(sessionId);
	if (user) {
		await lucia.invalidateSession(sessionId);
		return Response.json({ message: 'Logout' }, { status: 200 });
	}
	return new Response(null, {
		status: 401
	});
};

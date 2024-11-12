import { getUsersPlaceholderApi } from '$lib/api';

export async function getUsersPlaceholder() {
	const users = await getUsersPlaceholderApi();
	return users;
}

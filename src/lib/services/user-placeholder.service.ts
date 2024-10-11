import { getUsersPlaceholderApi } from '$lib/api';

export async function getUsersPlaceholder() {
	const response = await getUsersPlaceholderApi();
	return response;
}

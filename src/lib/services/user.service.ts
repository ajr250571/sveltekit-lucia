import { getUsersApi } from '$lib/api';

export async function getUsers() {
	return await getUsersApi();
}

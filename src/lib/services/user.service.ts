import axios from 'axios';
export async function getUsers() {
	const users = axios.get('/api/user').then((res) => res.data);
	return users;
}

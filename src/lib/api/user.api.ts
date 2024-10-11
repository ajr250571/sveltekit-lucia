import axios from 'axios';
export async function getUsersApi() {
	return await axios.get('/api/user').then((res) => res.data);
}

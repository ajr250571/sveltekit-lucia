import axios from 'axios';
export async function getUsersPlaceholderApi() {
	const response = (await axios.get('https://jsonplaceholder.typicode.com/users')).data;
	return response;
}

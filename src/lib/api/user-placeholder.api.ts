import axios from 'axios';
export async function getUsersPlaceholderApi() {
	const response = await fetch('https://jsonplaceholder.typicode.com/users').then((res) =>
		res.json()
	);
	return response;
}

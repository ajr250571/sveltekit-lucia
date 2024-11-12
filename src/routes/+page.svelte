<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';

	import type { UserPlaceholder } from '$lib/models';
	import { getUsersPlaceholder } from '$lib/services';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let users: UserPlaceholder[] = [];
	onMount(async () => {
		users = await getUsersPlaceholder().catch((error) => new Error(error));
	});
</script>

<div class="flex min-h-screen flex-col items-center gap-4">
	<div class="mt-2">
		<form method="post" use:enhance>
			<div class="flex w-96 justify-between my-2 border-b-2 py-2 px-2">
				<p class="text-3xl font-bold text-left">{data.username.toUpperCase()}</p>
				<button class="btn btn-secondary text-right">Logout</button>
			</div>
		</form>
		{#await users}
			<p>Cargando ...</p>
		{:then users}
			<h1 class="text-3xl font-bold m-2">Users</h1>
			{#each users as user}
				<div class="card card-compact bg-green-900 shadow-xl m-2">
					<div class="card-body">
						<div class="flex w-80 justify-between items-center">
							<h2 class="card-title">{user.name}</h2>
							<p class="text-right">{user.username}</p>
						</div>
						<div class="flex w-80 justify-between">
							<p>{user.email}</p>
							<p class="text-right">{user.website}</p>
						</div>
					</div>
				</div>
			{/each}
		{:catch error}
			<p>{error.message}</p>
		{/await}
	</div>
</div>

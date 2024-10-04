<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import type { UserPlaceholder } from '$lib/models';
	import { getUsersPlaceholder } from '$lib/services';

	let users: UserPlaceholder[] = [];
	onMount(async () => {
		users = await getUsersPlaceholder();
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-4">
	<div class="mt-2">
		<form method="post" use:enhance>
			<div class="flex w-96 justify-between my-2 border-b-2 py-2">
				<p class="text-3xl font-bold text-left">Hola, {$page.data?.username}</p>
				<button class="btn btn-secondary text-right">Logout</button>
			</div>
		</form>
		{#if users.length > 0}
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
		{:else}
			<p class="text-3xl font-bold text-center opacity-50 mt-20">No users found ...</p>
		{/if}
	</div>
</div>

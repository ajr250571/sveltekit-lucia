<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const handleLogout = async () => {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${$page.data.sessionId}`
			}
		});
		if (response.status === 200) {
			goto('/login');
		}
	};
</script>

<div class="navbar bg-primary text-primary-content">
	<div class="flex-1">
		<a href={'/'} class="btn btn-ghost text-xl">Sveltekit</a>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#if !$page.data?.username}
				<li><a href={'/signup'}>Register</a></li>
				<li><a href={'/login'}>Login</a></li>
			{:else}
				<li><button on:click={() => handleLogout()}>Logout</button></li>
			{/if}
		</ul>
	</div>
</div>

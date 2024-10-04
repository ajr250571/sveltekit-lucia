<!-- routes/login/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

<div class="flex min-h-screen flex-col items-center justify-center">
	<form method="post" use:enhance>
		<div class="card w-96 bg-base-300 p-4 shadow-xl">
			<h1 class="text-center text-3xl mb-4">Login</h1>
			<label class="input input-bordered flex items-center gap-2 mt-2 min-w-80">
				<i class="fa fa-user" />
				<input name="username" type="text" class="grow" placeholder="UserName" />
			</label>
			{#if $page.status === 400 && $page.form.code === 'INVALID_USERNAME'}
				<p class="text-error-content bg-error border-y-2 text-sm px-1">
					{$page.form.message}
				</p>
			{/if}
			<label class="input input-bordered flex items-center gap-2 mt-2 min-w-80">
				<i class="fa fa-lock" />
				<input name="password" type="password" class="grow" placeholder="Password" />
			</label>
			{#if $page.status === 400 && $page.form.code === 'INVALID_PASSWORD'}
				<p class="text-error-content bg-error border-y-2 text-sm px-1">
					{$page.form.message}
				</p>
			{/if}
			<button class="btn btn-primary my-4">Continue</button>
			{#if $page.status === 400 && $page.form.code === 'INCORRECT_USERNAME_OR_PASSWORD'}
				<p class="text-error-content bg-error border-y-2 text-sm px-1">
					{$page.form.message}
				</p>
			{/if}
		</div>
	</form>
</div>

# lucia

## Validate bearer tokens

For apps that can't use cookies, store the session ID in localstorage and send it to the server as a bearer token.

fetch("https://api.example.com", {
headers: {
Authorization: `Bearer ${sessionId}`
}
});
In the server, you can use Lucia.readBearerToken() to get the session ID from the authorization header and validate the session with Lucia.validateSession().

const authorizationHeader = request.headers.get("Authorization");
const sessionId = lucia.readBearerToken(authorizationHeader ?? "");
if (!sessionId) {
return new Response(null, {
status: 401
});
}
const { session, user } = await lucia.validateSession(sessionId);

## Validate requests

You can validate requests by checking locals.user. The field user.username is available since we defined the getUserAttributes() option. You can protect pages, such as /, by redirecting unauthenticated users to the login page.

// +page.server.ts
import type { PageServerLoad, Actions } from "./$types";

export const load: PageServerLoad = async (event) => {
if (!event.locals.user) redirect(302, "/login");
return {
username: event.locals.user.username
};
};

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

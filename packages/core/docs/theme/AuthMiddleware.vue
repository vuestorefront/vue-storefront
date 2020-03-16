<template>
  <div>
    <h1>Auth Middleware</h1>
    <p>The Auth Middleware provides a straightforward way to limit access to certain pages to logged users only.</p>
    <p>This middleware relies on integration-specific <code>useUser</code> composable that exposes <code>isAuthenticated</code> property.</p>
    <h2>Usage</h2>
    <!-- Change this paragraph and code sample once the issue of Nuxt not loading this middleware from core theme on build -->
    <p>The only thing you need to do to use the Auth Middleware is importing it in the page <code>.vue</code> file
    and using as a middleware for that page, like in the example below:</p>
    <Content slot-key="auth-middleware-example" />
  </div>
</template>

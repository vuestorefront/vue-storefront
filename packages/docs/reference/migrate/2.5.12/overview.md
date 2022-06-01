# Migrating projects to 2.5.12

## Update `nuxt.config.js`

In this release, we've added the optional  `middlewareUrl` property to define the URL to the Server Middleware. Open the `nuxt.config.js` file and add the `middlewareUrl` property to the `publicRuntimeConfig` object as shown below.

:::warning
Make sure to pass the whole URL with protocol, port (if applicable), and suffix it with `/api/`.
:::

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: process.env.NODE_ENV === 'production'
      ? 'https://example.com/api/' // Your production URL
      : 'http://localhost:3000/api/'
  }
}
```

If you don't want to hardcode the URL in the configuration file, you can use environmental variables.

Example:

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: process.env.API_BASE_URL
  }
}
```

Then add an entry in the `.env` file or use any other method for passing environmental variables that suits your needs.

Example:

```text
// .env
API_BASE_URL=https://example.com/api/
```

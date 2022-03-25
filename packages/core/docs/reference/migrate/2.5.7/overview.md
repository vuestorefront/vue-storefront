# Migrating projects to 2.5.7

## Update `nuxt.config.js`

:::warning
From version `2.5.8` the `middlewareUrl` is no longer required from the global config. However, it should be provided to handle integration specific API calls.
:::

In this release, we made the `middlewareUrl` property required for security reasons. Open the  `nuxt.config.js` file and add the `middlewareUrl` property like shown below:

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://yourdomain.com/api/' // For the local development, set it to `http://localhost:3000/api/`.
  }
}
```

:::warning
Make sure to pass whole url with protocol and/or port and suffix it with `/api/`.
:::

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
```
// .env
API_BASE_URL=https://yourdomain.com/api/
```

# Migrating projects to 2.5.7

## Extend `nuxt.config.js`

In this release we've removed generating `baseUrl` for api calls, based on request headers.
Now it has to be configured and proper `middlewareUrl` needs to be passed.

To do it, just extend `nuxt.config.js` and add `middlewareUrl`.
This field is now required, before it was optional.

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://yourdomain.com/api/'
  }
}
```

:::warning
Make sure to pass whole url with protocol and/or port and suffix it with `/api/`.
:::

For development, you can just use `http://localhost:3000/api/`.

If you don't want to hardcode url in config file, you can use environmental variables.

Example:

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: process.env.API_BASE_URL
  }
}
```

And then add entry in `.env` file or use any other method for passing environmental variables that suits your needs.

Example:
```
// .env
API_BASE_URL=https://yourdomain.com/api/
```

# Vue Storefront Middleware API URL

In the Vue Storefront framework, we use the Nuxt.js environment property to fetch the URL that will be used in the calls between the store and the `middleware`.

This URL fetching is done automatically by our Nuxt.js middleware. But we also provide the possibility to you configure your own URL.

To configure it, you need to define the property inside the `nuxt.config.js` file.

:::warning
Make sure to pass the whole URL with protocol, port (if applicable), and suffix it with `/api/`.
:::

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://yourdomain.com/api/' // For the local development, set it to `http://localhost:3000/api/`.
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
```
// .env
API_BASE_URL=https://yourdomain.com/api/
```

:::tip
When developing the application, the URL need to be defined as the local Nuxt.js URL
:::

```javascript
// nuxt.config.js
export default {
  publicRuntimeConfig: {
    middlewareUrl: process.env.NODE_ENV === 'production' ? `https://${process.env.API_BASE_URL}/api/`: 'http://{(Your IP):(Your Nuxt Port)/api/'
  }
}
```

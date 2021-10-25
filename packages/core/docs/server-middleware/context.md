# Application context

As described on the [Server Middleware basics](./basics.html) page, Application context is an object available in the Nuxt.js application. This object is populated by plugins and modules registered in the `nuxt.config.js` file. Some of them add their **client, configuration and API methods** to that object under a unique key. The Nuxt.js application later uses the Application context to exchange data with the Service providers.

## Structure of the context

Context is an object with unique keys, starting with `$` sign and followed by the name or abbreviation of the service name, e.g. `$ct` (for commercetools), `$magento`, `$sb` (for storyblok), etc.

Each of the keys contains an object with three properties:

- `api` - a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for sending requests to the Server Middleware.
- `client` - an `axios` HTTP client used for communication with the Server Middleware.
- `config` - an integration configuration.

For example, application with Magento and Storyblok plugins installed might have a context like this:

```javascript
{
  $magento: {
    api: {},
    client: {},
    config: {}
  },
  $sb: {
    api: {},
    client: {},
    config: {}
  }
}
```

## Accessing context

In most cases you don't need to access the context directly. Instead, you can call methods in the [Composables](/guide/composables.html) available in the integration, which internally call API methods with proper parameters.

However, there are cases when composables are not sufficient or you need to access integration configuration. For this reason we have a dedicated composable named `useVSFContext` to easy access the whole context object.

For example, you can call `products` API endpoint in Magento integration like so:

```javascript
import { useVSFContext } from '@vue-storefront/core';

export default {
  setup() {
    const { $magento } = useVSFContext();

    function getProducts(searchParams, customQuery = {}) {
      return $magento.api.products(searchParams, customQuery);
    }
  }
};
```

See the integration API reference for a list of available API methods.

## `api` handler

In the previous section we showed how to call an `api` method. 

## Extending context

The best and most straigh forward way of extending Application context it to use `integrationPlugin` helper. It give you access to the [Nuxt.js context](https://nuxtjs.org/docs/concepts/context-helpers/), which includes runtime configuration, route informartion, environment variables, cookie helpers and much more.

```javascript
// plugins/custom-context.js

import { integrationPlugin } from '@vue-storefront/core';

export default integrationPlugin(({
  integration
  // Other properties from Nuxt.js context like `app`, `route`, `res`, `req`, etc.
}) => {
  const settings = {};

  // Replace `<INTEGRATION_NAME>` with unique name or abbreviation
  integration.configure('<INTEGRATION_NAME>', settings);
});
```

When your plugin is ready, you need to register it in `nuxt.config.js`:

```javascript
// nuxt.config.js

export default {
  plugins: [
    '~/plugins/custom-context.js'
  ]
};
```

## Context plugin

If you don't want to use integration Nuxt modules, you have to configure the integration yourself. For that purpose, each integration exposes an integration plugin:

```js
// plugins/integration.js
import { integrationPlugin } from '@vue-storefront/commercetools';

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' };

  integration.configure({ ...settings });
});
```

Each integration has a predefined set of API functions that sometimes you may want to override. A `configure` function gives you that ability as well. When you pass your new API function or use the name of an existing one, the Vue Storefront will automatically apply it to the app.

```js
// plugins/integration.js
import { integrationPlugin } from '@vue-storefront/commercetools';
import { getMe } from '@vue-storefeont/your-integration';

export default integrationPlugin(({ app, integration }) => {
  const settings = { api: '/graphql', user: 'root' };

  integration.configure({ ...settings }, { getMe });
});
```

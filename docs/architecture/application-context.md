# Application context

An application context is an object available in the Nuxt.js application.
Plugins and modules registered in the `nuxt.config.js` file populate this object and add integration-specific data under a unique key. The Nuxt.js application later uses this information to send requests to the Server Middleware.

## Structure of the context

Context is an object with unique keys, starting with the `$` sign and followed by the name or abbreviation of the installed integrations, e.g. `$ct` (for commercetools), `$magento`, `$sb` (for storyblok), etc.

Each of the keys contains an object with three properties:

- `api` - a [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) for sending requests to the Server Middleware.
- `client` - an `axios` HTTP client used for communication with the Server Middleware.
- `config` - an integration configuration.

For example, an application with Magento and Storyblok plugins installed might have a context like this:

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

In most cases, you don't need to access the context directly. Instead, you can call methods in the [Composables](/composition/composables.html) available in the integration, which internally calls API methods with proper parameters.

However, there are cases when composables are not sufficient, or you need to access integration configuration. For this reason, we have a dedicated composable named `useVSFContext` to easily access the whole context object.

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

In the previous section, we showed how to call the `api` method. You might be wondering how it's transformed into a network request to the Server Middleware.

Server Middleware **[URL paths](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL#path_to_resource)** always consists of three parts:

- `/api` - endpoints in Server Middleware are prefixed with `/api` to avoid conflicts with Nuxt.js routes,
- name of the integration,
- name of the endpoint.

**Request body** is an array including all parameters passed to the method.

Following this rule, when you call the `$magento.api.products`, it sends the request to the `/api/magento/products` endpoint.

<img
  src="./images/api-request.webp"
  alt="Mapping of the `api` method call to the Server Middleware request"
  style="display: block; margin: 0 auto; max-height: 400px">

## Extending context

The best and most straightforward way of extending the Application context is to use the `integrationPlugin` helper. It gives access to the `integration` helper and [Nuxt.js context](https://nuxtjs.org/docs/concepts/context-helpers/), which includes runtime configuration, route information, environment variables, cookie helpers, and much more.

You can call the `integration.configure` method to add new integration to the context. This method accepts two parameters:

- **(string)** - unique name of the integration,
- **(object)** - configuration with any properties you need. You can use two properties described below to change the default behavior of the integration:
  - `axios` **(object)** - passed to the [axios.create](https://github.com/axios/axios#axioscreateconfig) method when creating an HTTP client for this specific integration (doesn't affect other integrations),
  - `api` **(object)** - contains functions that can be called on the integration's [`api` handler](#api-handler). The exception is that these functions execute in Nuxt.js, not Server Middleware. Object keys must match the method called on the [`api` handler](#api-handler).

```javascript
// plugins/custom-context.js
import { integrationPlugin } from '@vue-storefront/core';

export default integrationPlugin(({
  integration
  // Other properties from Nuxt.js context like `app`, `route`, `res`, `req`, etc.
}) => {
  const configuration = {};

  // Replace `<INTEGRATION_NAME>` with unique name or abbreviation
  integration.configure('<INTEGRATION_NAME>', configuration);
});
```

When your plugin is ready, you need to register it in the `nuxt.config.js` file:

```javascript
// nuxt.config.js
export default {
  plugins: [
    '~/plugins/custom-context.js'
  ]
};
```

## What's next

Now that we understand how the Nuxt.js application creates Application context and sends requests to the Server Middleware, it's time to dive deeper into the [Server Middleware](./server-middleware.html) itself.

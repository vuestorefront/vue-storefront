# Server Middleware

The Server Middleware is an Express.js application implemented for a variety of reasons, such as to:

- connect multiple services using different technologies and libraries,
- allow you to create and [extend](/integrate/extending-integrations.html) integrations to add new capabilities or modify their behavior,
- give you control of the requests sent to the integration platform and responses sent back to the Nuxt.js application,
- securely store credentials on the server without exposing them to the end-users of your application,
- improve the performance by moving all logic of the networking layer to the server, thus shipping less code to the browser.

## Configuration

Every Vue Storefront application comes with the `middleware.config.js` file located at the project's root. Inside this file, you can register packages that extend the Server Middleware by adding new API endpoints or modifying the Express.js application itself.

```javascript
// middleware.config.js
module.exports = {
  integrations: {

  }
};
```

Every integration you register inside of this file must have a unique key provided in the installation guide of said extension. The name of the key must match the key in the [Application context](../architecture/application-context.html), and changing it will likely cause the integration to malfunction.

Registered integration must have a configuration matching the [Integration interface](/reference/api/core.integration.html). This configuration might look like this:

```javascript
// middleware.config.js
module.exports = {
  integrations: {
    '<INTEGRATION_NAME>': {
      location: '',
      extensions: (baseExtensions) => [
        ...baseExtensions,
        // other extensions
      ],
      configuration: {},
      customQueries: {}
    }
  }
};
```

## Creating an integration

To create Server Middleware integration, you can follow our [Integrating eCommerce platform](/integrate/integration-guide.html) guide. Some integrations don't need a custom theme. In such a case, you can delete the `theme` folder from our integration boilerplate project and skip parts of the guide concerning it.

## Extending an integrations

As shown in the [Configuration](#configuration) section, integrations can be extended. To learn more, you can follow our [Extending integrations](/integrate/extending-integrations.html) guide.

## Separating Server Middleware from Nuxt.js

By default, Server Middleware runs as an extension to the Express server used by Nuxt.js, but it can also run independently as a separate process. You can do this by creating the `middleware.js` file:

```javascript
// middleware.js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

(async () => {
  const app = await createServer({ integrations });

  app.listen(8181, () => {
    console.log('Middleware started');
  });
})();
```

When running this file using Node.js, the middleware will start its server without relying on Nuxt.js.

You need to remove the Server Middleware module from the `nuxt.config.js` and configure the domain your middleware is using.

```diff
// nuxt.config.js
export default {
  modules: [
-    '@vue-storefront/middleware/nuxt'
  ],
+  publicRuntimeConfig: {
+    middlewareUrl: 'https://api.example.com'
+  }
}
```

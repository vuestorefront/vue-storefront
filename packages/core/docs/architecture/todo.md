# Configuration

When it comes to configuration, middleware has a dedicated config called `middleware.config.js` that contains a section with integrations(`integrations`) along with their credentials and other options.

```js
module.exports = {
  integrations: {
    <TAG NAME>: {
      location: '@<integration-package>/server',
      configuration: {}
      extensions: (extensions) => extensions,
      customQueries: {}
    }
  }
};
```

Each entry under the `integrations` section starts with a tag name of given integration and contains an object with the following fields:

- `location` - points to the package of the API-client, related to given integration (server entry point)
- `configuration` - contains a configuration of given integration, such as credentials and others
- `extensions` - a function that returns a extensions (jump to the next section)
- `customQueries` - a section that contains custom queries (GraphQL only)

-----------------------------------------------------------------------------------------------

# Separating middleware from Nuxt

By default, Vue Storefront middleware is running within the Nuxt.js process. Sometimes there is a need to disconnect it from the app and run it as a separate and independent instance (process).

Since it's just an Express application, you can do this by creating a `middleware.js` file:

```js
const { createServer } = require('@vue-storefront/middleware');
const { integrations } = require('./middleware.config');

const app = createServer({ integrations });

app.listen(8181, () => {
  console.log('Middleware started');
});
```

Now, when you run this using Node, your middleware should work separately.

Additionally, you need to remove the middleware module entry from the `nuxt.config.js` and configure the domain, where your middleware is settled.

```js
export default {
  publicRuntimeConfig: {
    middlewareUrl: 'https://api.commerce.com'
  }
}
```

-----------------------------------------------------------------------------------------------

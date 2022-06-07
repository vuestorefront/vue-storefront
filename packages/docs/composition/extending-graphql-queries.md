# Extending GraphQL queries

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

If your integration uses GraphQL API, you may want to change the default query or mutation sent. That's quite a common case for fetching additional or custom fields. Vue Storefront provides the mechanism for this called "custom queries".

Since the communication with the API goes through our middleware, all queries also are defined there. To customize or even entirely override the original (default) queries, you need to follow two steps.

Firstly, you need to pass a `customQuery` parameter to the method that triggers the call to the API. It's an object where the keys are the name of the default queries and values are the name of the custom query that overrides them. Additionally, a special parameter called `metadata` allows you to optionally pass additional parameters to your custom query that will be accessible in the custom query function.

```ts
const { search } = useProduct();

search({
  customQuery: {
    products: 'my-products-query',
    metadata: { size: 'xl' }
  }
});
```

In the example above, we change the `products` query with our custom query named `my-products-query`. Additionally, the `metadata` field holds additional parameters about the product we seek for. As a second step, we need to define `my-products-query` query.

Each custom query lives in the `middleware.config.js`, so it's the place where we should define `my-products-query`.

Custom query functions have the arguments:

- the default query (`query`),
- default variables (`variables`) passed to the query,
- additional parameters passed from the front-end (`metadata`).

This function must always return an object with `query` and `variables` keys, while in the body, you can do anything you want with those parameters - you can modify them or change to the new ones.

Every custom query is registered in the `middleware.config.js` file:

```js
// middleware.config.js

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries: {
        'my-products-query': ({ query, variables, metadata }) => {

          variables.locale = 'en'
          variables.size = metadata.size

          return { query, variables }
        }
      }
    }
  }
};
```

In the example above, we only modified some `variables` passed to the custom query. However, we can also change the default GraphQL query:

```js
// middleware.config.js

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries: {
        'my-products-query': ({ variables }) => ({
          query: `
            query products($where: String) {
              products(where: $where) { /* ... */ }
            }
          `,
          variables,
        })
      }
    }
  }
};
```

## Keeping the configuration tidy

Your configuration file can quickly become a mess if you override a lot of queries. We recommend extracting them into a separate folder to not overload `middleware.config.js` with GraphQL queries.
You can create a new file (or files) that exports the queries. Then, you can import them in the `middleware.config.js`:

```js
// customQueries/index.js

module.exports = {
  'my-products-query': ({ variables }) => ({
    query: `
      query products($where: String) {
        products(where: $where) { /* ... */ }
      }
    `,
    variables,
  }),
  ... // other custom queries
};
```

Now let's import it in `middleware.config.js`:

```js
// middleware.config.js

const customQueries = require('./customQueries');

module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries,
    }
  }
};
```

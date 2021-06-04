# Extending GraphQL Queries

If your integration uses GraphQL API, you may need to change the default query that is being sent to fetch the data. That's quite a common case and Vue Storefront also provides the mechanism for this.

Since the communication with the API goes through our middleware, all queries also are defined there.

To customize or even totally override the original (default) queries you need to follow two steps.

Firstly, you need to use a dedicated parameter: `customQuery` that tells the app, what to do with a query.
This parameter is an object that has a name of the queries as keys, and the name of the queries function under the values. Additionally, it has a special parameter called `metadata` which allows you to pass optional parameters to your custom query that will be accessible in the custom query function.

```ts
const { search } = useProduct();

search({
  customQuery: {
    products: 'my-products-query',
    metadata: { size: 'xl' }
  }
}); 
```

In the example above, we are changing `products` query, and our function that will take care of this overriding is `my-products-query`. Additionally, we used `metadata` field to send information about the product we seek for. As a second step, we need to define that function.

Each custom query lives in the `middleware.config.js`, so it's the place where we should define `my-products-query`.

Customizing variables:

```js
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

Writing custom GraphQL queries:

```js
module.exports = {
  integrations: {
    ct: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries: {
        'my-products-query': ({ variables }) => {
          query: `
            query products($where: String) {
              products(where: $where) { /* ... */ }
            }
          `,
          variables,
        }
      }
    }
  }
};
```

In case of many custom queries extending the default ones, we recommend extracting them into separate folder to not overload `middleware.config.js` with GraphQL queries:

```js
// customQueries/index.js

module.exports = {
  'my-products-query': ({ variables }) => {
    query: `
      query products($where: String) {
        products(where: $where) { /* ... */ }
      }
    `,
    variables,
  },
  ... // other custom queries
};
```

And then import it in `middleware.config.js`:

```js
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

The custom query function always has in the arguments the default query (`query`), default variables (`variables`) and additional parameters (`metadata`) sent from the front-end. This function always must return the query and its variables as well, while in the body you can do anything you want with those parameters - you can override them or even change to the new ones.

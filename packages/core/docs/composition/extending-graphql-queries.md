# Extending GraphQL queries

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

If given e-commerce integration uses GraphQL API, you may want to change the default queries or mutations sent to it from the Vue Storefront application. It's possible for selected requests using "custom queries".

Custom queries allow you to modify or even entirely replace the default GraphQL queries and mutations that the integration uses out of the box. To do this, follow the steps above.

## Registering and using custom query

### Step 1: Check if the method is extendable

First, you need to check if a given method is extendable because not all integrations and methods allow that.

Go to the documentation of the [e-commerce integration](/integrations) of your choice. Look for the page describing the composable, then the section for the method you want to override, and see if it mentions `customQuery`. If it does, you can override it.

If the method doesn't support extending, you can instead replace the whole API endpoint called by it using the `extendApiMethod` described on the [Extending integrations](/integrate/extending-integrations.html) page.

### Step 2: Register custom query

Custom queries are registered individually for every integration in the `middleware.config.js` file. They are function represented by the [CustomQueryFn](/reference/api/core.customqueryfn.html) type.

These functions accept one object parameter with the following properties:

* `query` - default GraphQL query or mutation,
* `variables` - default variables passed to the query or mutation,
* `metadata` - additional parameters passed from the front-end that a given function may not support by default.

The function must always return an object with `query` and `variables` properties.

**Example**

In this example, we override the default query and pass the custom `size` property to `variables`.

```javascript
// middleware.config.js

module.exports = {
  integrations: {
    '{INTEGRATION}': {
      location: '{INTEGRATION}',
      customQueries: {
        'my-products-query': ({ query, variables, metadata }) => {
          variables.size = metadata.size;

          return {
            query: `
              query products($where: String) {
                products(where: $where) { /* ... */ }
              }
            `,
            variables,
          };
        }
      }
    }
  }
};
```

### Step 3: Update composable method calls

The last step is to add `customQuery` object to composable methods you want to extend.

Object keys are the names of the default queries. To get them, go to the documentation of the [e-commerce integration](/integrations) of your choice and look for the page describing the composable, then the section for the method you want to override and find the `customQuery` key.

Object values are the names of the custom queries you defined in the `middleware.config.js` file.

A parameter called `metadata` allows you to optionally pass additional parameters to your custom query, which the given method doesn't support by default.

::: warning Be careful about potential data mismatch
If you customize query for composable with multiple methods or with state shared across many components and pages (such as `useUser` or `useCart`), make sure to override all method calls. Otherwise, you might cause a data mismatch, where the customized method will return different data than the other methods.
:::

**Example**

In this example, we change the `products` query. Following the example above, we use a custom query named `my-products-query` and pass the metadata with the `size` property.

```typescript
const { search } = useProduct();

await search({
  sku: 'product-1',
  customQuery: {
    products: 'my-products-query',
    metadata: { size: 'xl' }
  }
}); 
```

## Keeping the configuration tidy

Your configuration file can quickly become messy if you override a lot of queries. We recommend extracting them into a separate folder to not overload `middleware.config.js` with GraphQL queries.

You can create a new file (or files) that exports the queries. Then, you can import them in the `middleware.config.js`:

```javascript
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
  // Other custom queries
};
```

Now import it in `middleware.config.js`:

```javascript
// middleware.config.js

const customQueries = require('./customQueries');

module.exports = {
  integrations: {
    '{INTEGRATION}': {
      location: '{INTEGRATION}',
      customQueries,
    }
  }
};
```

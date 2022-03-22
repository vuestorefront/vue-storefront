# Extending GraphQL queries

:::danger Don't forget to reload the application
The application does not reload automatically after saving the changes in Server Middleware. Due to this, you have to restart the application manually. We are working on enabling Hot Reloading in future updates.
:::

If given integration uses GraphQL API, you may want to change the default queries or mutations sent to the platform. It's possible for selected requests using "custom queries".

## Using custom queries

Custom queries allow you to modify or even entirely replace the default GraphQL queries and mutations that the integration uses out of the box by passing an additional parameter to the methods in the composables. Because not every integration and method supports it, you first need to check if a given composable method is extendable.

### Step 1: Check if the method is extendable

Go to the documentation of the [e-commerce integration](/integrations) of your choice. Look for the page describing the composable, then the section for the method you want to override, and see if it mentions `customQuery`. If it does, you can override it.

If the method doesn't support extending, you can instead replace the whole API endpoint called by it using the `extendApiMethod` described on the [Extending integrations](/integrate/extending-integrations.html) page.

### Step 2: Register custom query

Custom queries are functions represented by the [CustomQueryFn](/reference/api/core.customqueryfn.html) type and are registered individually for every integration in the `middleware.config.js` file.

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

### Step 3: Update composable methods

The last step is to add the `customQuery` object to the composable method you want to change.

```javascript
await composableMethod({
  customQuery: {
    '<KEY>': '<VALUE>',
    metadata: {}
  },
  // Other composable parameters
}); 
```

In the `customQuery` object:

* `<KEY>` represents the name of the default queries. To get it, go to the documentation of the composable method and find the `customQuery` key associated with it,
* `<VALUE>` represents the name of the custom queries you defined in the `middleware.config.js` file,
* `metadata` key allows you to optionally pass additional parameters to your custom query, which the given method doesn't support by default.

You should be aware that even though most composable methods have only one associated query, there are exceptions. In such cases, you can add multiple key-value pairs to the `customQuery` object.

**Example**

In this example, we change the `products` query. Following the example from the previous step, we use a custom query named `my-products-query` and pass the metadata with the `size` property.

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

## Preventing data mismatch

You should be careful about two cases where you can cause a data mismatch by using a custom query.

### Composables with multiple methods

Composables with multiple methods share the same data property. If you only change one method, the other will not return the same data.

For example, adding a custom query with additional property to the `useCart.load()` method will make that property available in the `cart` object on the initial page load. Calling unchanged `useCart.addItem()` later will make the property disappear.

In such cases, you need to update all methods in a given composable.

### Methods called across many components

You may call the same composable method across many components and pages. If you only change it in one place, you will not have the same data in other places.

For example, adding a custom query to the `useProduct.load()` method on the Product page will only affect that page. The same method called without a custom query on the Checkout page will use the default query.

In such cases, you need to update all components using that method.

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

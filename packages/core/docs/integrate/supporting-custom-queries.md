# Supporting custom GraphQL queries

:::warning 
This functionality is only available to integrations using GraphQL to communicate with the platform API.
:::

Unlike REST APIs, which return most or all available data on every request, GraphQL allows us to specify what information we want to get. It's great for performance, but developers will likely need data that you didn't include in the default GraphQL query.

Vue Storefront provides a way to dynamically change the default GraphQL queries for selected API requests as described in the [Extending GraphQL Queries](../composition/extending-graphql-queries.html) document.

The name of the custom query is available within the second argument in composable factory methods. It must be passed as the last parameter when calling an API method.

```ts
// packages/src/composables/src/useProduct
import { ComposableFunctionArgs } from '@vue-storefront/core';

const productFactoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS> = {
  async productSearch (context: Context, params: ComposableFunctionArgs<PRODUCT_SEARCH_PARAMS>) {
    // Extract `customQuery` from the rest of parameters
    const { customQuery, ...searchParams } = params;

    // Change "yourIntegration" to the name of the integration
    const product = await context.$yourIntegration.api.getProduct(searchParams, customQuery);
  }
}
```

In `api-client` API methods, you can call `context.extendQuery` with `customQuery` parameter, default query, and default variables. It will return queries and variables to use in the GraphQL client.

```ts
// packages/src/api-client/src/api/getProduct
import { CustomQuery } from '@vue-storefront/core';

const getProduct = async (context, params, customQuery: CustomQuery) => {
  // Load and parse default and custom query
  const { products } = context.extendQuery(
    customQuery,
    {
      products: {
        query: defaultQuery,
        variables: defaultVariables
      }
    }
  );

  // Pass query and variables to GraphQL client
  return context.client({
    query: gql`${products.query}`,
    variables: products.variables,
  });
};
```

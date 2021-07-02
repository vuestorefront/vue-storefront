# Supporting custom GraphQL queries

# Supporting custom GraphQL queries

:::warning 
This functionality is only available to integrations using GraphQL to communicate with the platform API.
:::

Unlike REST APIs, which return most or all available data on every request, GraphQL allows us to specify what information we need. It's great for performance, but developers will likely need data that you didn't include in the GraphQL query.

Vue Storefront provides a way to dynamically change the default, predefined GraphQL queries for selected API requests. The `context` parameter of the API method has an `extendQuery` function that allows overriding GraphQL query. Each custom query modifier lives in the `middleware.config.js`.

```js
module.exports = {
  integrations: {
    ['<INTEGRATION_TAG>']: {
      location: '@vue-storefront/commercetools-api/server',
      configuration: { /* ... */ },
      customQueries: {
        'custom-query-modifier': ({ query, variables }) => {
          variables.locale = 'en'
          return { query, variables }
        }
      }
    }
  }
};
```

The custom query modifier function always has in the arguments the default query and default variables and must return the query and its variables as well. In the body you can do anything you want with those parameters - you can override them or even change to the new ones. After creating the modifier function, you can use `extendQuery` to change the default query from middleware api method by providing `customQuery` object parameter that contains the query name as key and the identifier of the modifier function as value from client-side api method call. `extendQuery` function will produce modified query using specified modifier function that can be used to fetch required data.

```ts
// api-client/src/api/getProduct
const getProduct = async (context: Context, params: PARAMS, customQuery: Record<string, string>) => {
  const { products } = context.extendQuery(
    customQuery, { products: { query: defaultQuery, variables: defaultVariables } }
  );

  return context.client({
    query: gql`${products.query}`,
    variables: products.variables,
  });
};
```

Proxied version of this api method can be used within composable method with `customQuery` support. Now you can modify grapGL queries by providing modifier function identifier to composable method inside component setup function.

```ts
// composables/src/useProduct
const productFactoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS> = {
  async productSearch (context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }) {
    const { customQuery, ...searchParams } = params;
    const product = await context['<INTEGRATION_TAG>'].api.getProduct(searchParams, customQuery)
    return product
  }
}
```

```ts
// theme/pages/Product.vue
import { useProduct } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core`

export default {
  setup() {
    const { products, search} = useProduct('<PRODUCT_ID>');

    onSSR(async () => {
      await search({ customQuery: { products: 'custom-query-modifier' }})
    })

    return {
      products
    };
  }
};

```

This approach gives you the flexibility to manage qraphQL queries from the client side without increasing the bundle size with qraphQL libraries and queries.
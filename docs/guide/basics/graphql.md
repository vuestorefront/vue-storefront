# GraphQL Action Plan

Starting with Vue Storefront 1.4.0, we're supporting two ways of getting data from the backend:

- existing `api` mode, which is using ElasticSearch DSL as a query language
- new `graphql` mode, which is using GraphQL queries.

You can set the desired API format in the `config/local.json` and `vue-storefront-api` is supporting both of them, however [the default is still set to `api`](https://github.com/DivanteLtd/vue-storefront/blob/4cbf866ca93f917b04461d3ae139a2d26ddf552a/config/default.json#L6).

We've introduced an abstract [`SearchQuery`](https://github.com/DivanteLtd/vue-storefront/tree/develop/core/store/lib/search) interface with switchable Query Adapters to provide the abstraction layer. This is an ultra-cool feature, especially when you're integrating Vue Storefront with a custom backend application—you're able [to create your own adapter](https://github.com/DivanteLtd/vue-storefront/tree/develop/core/lib/search/adapter) to customize the way data is gathered from the backend.

From now on the **bodybuilder** package is **deprecated** and you should start using the `SearchQuery` interface to build the search queries that will be translated to GraphQL / API queries.

Here is an example of how to build the Query:

```js
export function prepareRelatedQuery(key, sku) {
  let relatedProductsQuery = new SearchQuery();

  relatedProductsQuery = relatedProductsQuery.applyFilter({
    key: key,
    value: { in: sku },
  });

  relatedProductsQuery = relatedProductsQuery
    .applyFilter({ key: 'visibility', value: { in: [2, 3, 4] } })
    .applyFilter({ key: 'status', value: { in: [0, 1, 2] } }); // @TODO Check if status 2 (disabled) was set not by occasion here

  if (config.products.listOutOfStockProducts === false) {
    relatedProductsQuery = relatedProductsQuery.applyFilter({
      key: 'stock.is_in_stock',
      value: { eq: true },
    });
  }

  return relatedProductsQuery;
}

let relatedProductsQuery = prepareRelatedQuery(key, sku);

this.$store
  .dispatch('product/list', {
    query: relatedProductsQuery,
    size: 8,
    prefetchGroupProducts: false,
    updateState: false,
  })
  .then(response => {
    if (response) {
      this.$store.dispatch('product/related', {
        key: this.type,
        items: response.items,
      });
      this.$forceUpdate();
    }
  });
```

[More information on how to query the data](https://github.com/DivanteLtd/vue-storefront/blob/develop/docs/guide/data/elastic-queries.md).

**Bodybuilder**  queries are still supported by our backward-compatibility mode, so if you've used bodybuilder in your theme, it's fine as long as you're using the `api` mode for the backend queries.

The **legacy queries** using bodybuilder will still work - and [here is an example](https://github.com/pkarw/vue-storefront/blob/28feb8e5dc30ec216353ef87a859212379901c57/src/extensions/template/index.js#L36).

You can also use direct **ApolloQuery** GraphQL queries thanks to `vue-apollo` support. Please find the example [in here](https://github.com/DivanteLtd/vue-storefront/blob/4cbf866ca93f917b04461d3ae139a2d26ddf552a/src/themes/default/components/core/blocks/SearchPanel/SearchPanel.gql.vue#L21).

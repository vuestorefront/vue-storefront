# Data Entity Types

:::danger REMINDER
This document is _archived_ and _NOT_ relevant with the latest version which is `1.12` at the time of writing. Please keep in mind this document is supposed to help you maintain legacy product, not the fresh installation. 
:::

Vue Storefront uses multiple data-entity types to cover the whole scope of the storefront. Default entity types are:

- Product
- Category
- Attribute
- Taxrule

These entity types were hardcoded and there was no ability to easily use another custom entity type required for customization.

Now, Vue Storefront has a new logic to work with entities in the data-fetching perspective: Entity Types.

Each search adapter should register an entity type to cover a search feature. Default API and new GraphQL search adapters are updated to register all required existing entity types, but developers can also inject custom entity types to work with some other custom entity type data (for example, to get a list of offline stores or something else).

To use it, an internal GraphQL server should be updated with adding a corresponding resolver for the new entity type. Also, you can use some other external GraphQL server that already has implemented a resolver for this entity type.

To register such an entity type, you should use the `searchAdapter.registerEntityTypeByQuery` method like shown in the example below:

```js
const factory = new SearchAdapterFactory();
let searchAdapter = factory.getSearchAdapter('graphql');
searchAdapter.registerEntityTypeByQuery('testentity', {
  url: 'http://localhost:8080/graphql/',
  query: require('./queries/testentity.gql'),
  queryProcessor: query => {
    // function that can modify the query each time before it's being executed
    return query;
  },
  resultProcessor: (resp, start, size) => {
    if (resp === null) {
      throw new Error('Invalid graphQl result - null not exepcted');
    }
    if (resp.hasOwnProperty('data')) {
      return processESResponseType(resp.data.testentity, start, size);
    } else {
      if (resp.error) {
        throw new Error(JSON.stringify(resp.error));
      } else {
        throw new Error(
          "Unknown error with graphQl result in resultProcessor for entity type 'category'",
        );
      }
    }
  },
});
```

The sample extension `sample-custom-entity-graphql` was added to illustrate how it can be used. It injects a custom entity type `testentity` and sets a custom GraphQL server URL (it is the same as a default API host in the example, because a resolver for this `testentity` was added there for testing. But please notice it was removed there).

To test a sample extension with resolver, you can add a GraphQL schema file and resolver file in the separate `src/graphql/elastcisearch/testentity` folder in the Vue Storefront API.

`schema.graphqls` file:

```graphql
type Query {
  testentity(filter: TestInput): ESResponse
}
input TestInput
  @doc(
    description: "TaxRuleInput specifies the tax rules information to search"
  ) {
  id: FilterTypeInput
    @doc(description: "An ID that uniquely identifies the tax rule")
  code: FilterTypeInput
    @doc(
      description: "The unique identifier for an tax rule. This value should be in lowercase letters without spaces."
    )
  priority: FilterTypeInput @doc(description: "Priority of the tax rule")
  position: FilterTypeInput @doc(description: "Position of the tax rule")
  customer_tax_class_ids: FilterTypeInput
    @doc(description: "Cunstomer tax class ids of the tax rule")
  product_tax_class_ids: FilterTypeInput
    @doc(description: "Products tax class ids of the tax rule")
  tax_rate_ids: FilterTypeInput
    @doc(description: "Tax rates ids of the tax rule")
  calculate_subtotal: FilterTypeInput
    @doc(description: "Calculating subtotals of the tax rule")
  rates: FilterTypeInput @doc(description: "Rates of the tax rule")
}
```

Resolver file `resolver.js`:

```js
import config from 'config';
import client from '../client';
import { buildQuery } from '../queryBuilder';

async function testentity(filter) {
  let query = buildQuery({ filter, pageSize: 150, type: 'taxrule' });

  const response = await client.search({
    index: config.elasticsearch.indices[0],
    type: config.elasticsearch.indexTypes[4],
    body: query,
  });

  return response;
}

const resolver = {
  Query: {
    testentity: (_, { filter }) => testentity(filter),
  },
};

export default resolver;
```

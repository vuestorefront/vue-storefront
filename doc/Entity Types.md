## Data Entity Types

Vue-storefront uses multuiple data entity typos to cover  whole scope of storefront
Default entity types are
- Product
- Category
- Attribute
- Taxrule

Using if these entity types was hardcoded and there were no ability to easy use another custom entity type required for customisation
Now Vue-storefront has a new logic to work with entityes in the data fetching prospective. It uses Entity Types.

Each search adapter should register entity type to cover search feature. Default API and new Graphql search adapters are updated to register all required exsiting entity types. But develper is able alss inject custom entittypes what allow them to  work with some other custom entity type Data (eg get list of offline stores or something else)

To use it internal graphql server should be updated with adding correspond resolver for new entity type. Or some other external graphql server what already have implemeted resolver for this entity type can be used

To register such entity type use searchAdapter.registerEntityTypeByQuery method like as on an example below


```js
const factory = new SearchAdapterFactory()
let searchAdapter = factory.getSearchAdapter('graphql')
searchAdapter.registerEntityTypeByQuery('testentity', {
  url: 'http://localhost:8080/graphql/',
  query: require('./queries/testentity.gql'),
  queryProcessor: (query) => {
    // function that can modify the query each time before it's being executed
    return query
  },
  resultPorcessor: (resp, start, size) => {
    if (resp === null) {
      throw new Error('Invalid graphQl result - null not exepcted')
    }
    if (resp.hasOwnProperty('data')) {
      return processESResponseType(resp.data.testentity, start, size)
    } else {
      if (resp.error) {
        throw new Error(JSON.stringify(resp.error))
      } else {
        throw new Error('Unknown error with graphQl result in resultPorcessor for entity type \'category\'')
      }
    }
  }
})

```

Sample extension 'sample-custom-entity-graphql' was added to illustrate how it can be used. It injects custom entity type 'testentity'
and set custom graphql server url( it is the same as a default api host in the example just because resolver for this 'testentity' was added there for testing. But please notice it was removed there)

To test sample extension with resolver you can add graphql schema file and reolver file in the separate 'src/graphql/elastcisearch/testentity' folder in the Vue-Storefront-Api

'schema.graphqls' file:
```graphql
type Query {
    testentity(filter: TestInput): ESResponse
}
input TestInput @doc(description: "TaxRuleInput specifies the tax rules information to search") {
    id: FilterTypeInput @doc(description: "An ID that uniquely identifies the tax rule")
    code: FilterTypeInput @doc(description: "The unique identifier for an tax rule. This value should be in lowercase letters without spaces.")
    priority: FilterTypeInput @doc(description: "Priority of the tax rule")
    position: FilterTypeInput @doc(description: "Position of the tax rule")
    customer_tax_class_ids: FilterTypeInput @doc(description: "Cunstomer tax class ids of the tax rule")
    product_tax_class_ids: FilterTypeInput @doc(description: "Products tax class ids of the tax rule")
    tax_rate_ids: FilterTypeInput @doc(description: "Tax rates ids of the tax rule")
    calculate_subtotal: FilterTypeInput @doc(description: "Calculating subtotals of the tax rule")
    rates: FilterTypeInput @doc(description: "Rates of the tax rule")
}
```

and resolver file 'resolver.js' is

```js
import config from 'config';
import client from '../client';
import { buildQuery } from '../queryBuilder';

async function testentity(filter) {
  let query = buildQuery({ filter, pageSize: 150, type: 'taxrule' });

  const response = await client.search({
    index: config.elasticsearch.indices[0],
    type: config.elasticsearch.indexTypes[4],
    body: query
  });

  return response;
}

const resolver = {
  Query: {
    testentity: (_, { filter }) => testentity(filter)
  }
};

export default resolver;

```
import { SearchCategoriesQuery, SearchCategoriesQueryVariables } from '../../graphql/types';
import { FacetSearchResult, Context } from '@vue-storefront/core';
import queryDocument from './searchCategoriesQuery';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchCategories(context : Context, params: FacetSearchResult<any>): Promise<any> {
  const { config, client } = context;
  console.log('context', context);
  console.log('params', params);
  const {store, getUserId, currency, locale } = config;
   const { data } = await client.query({
    query: queryDocument,
    variables: {
      filter: '', //TODO
      storeId: store,
      userId: getUserId(),
      currencyCode: currency,
    },
    fetchPolicy: 'no-cache'
  });

  return { 
    data: data.categories.items,
    total: data.categories.totalCount
   };
}
export default searchCategories;


import { SearchCategoriesQuery, SearchCategoriesQueryVariables } from '../../graphql/types';

import queryDocument from './searchCategoriesQuery';

import { xApiClient, getSettings } from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchCategories(options: any): Promise<any> {
  
  const {store, userId, currency, locale } = getSettings();
  const { data } = await xApiClient.query<SearchCategoriesQuery, SearchCategoriesQueryVariables>({
    query: queryDocument,
    variables: {
      filter: '', //TODO
      storeId: store,
      userId: userId,
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


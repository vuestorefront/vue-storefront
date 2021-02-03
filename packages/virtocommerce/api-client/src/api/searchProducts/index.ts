import { SearchProductsQuery, SearchProductsQueryVariables, GetProductByIdQueryVariables } from '../../graphql/types';

import searchProductsQueryDocument from './searchProductsQuery';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function searchProducts({ config, client }, options: any): Promise<any> {
console.log('searchProducts()', options);
  const {store, getUserId, currency, locale, catalogId } = config;
  const { data } = await client.query({
    query: searchProductsQueryDocument,
    variables: {
      storeId: store,
      userId: getUserId(),
      currencyCode: currency,
      cultureName: locale,
      //it is workaround to get catalogId from config  need to inference catalog id from store
      filter:  options.input?.outline ? `category.subtree:${catalogId}/${options.input.outline}` : '',
      first: options.input?.itemsPerPage ?? 10,
      after: String(options.input.page ?? 1 * options.input.itemsPerPage ?? 10)
    },
    fetchPolicy: 'no-cache'
  });
  return { 
    data: data.products.items,
    total: data.products.totalCount
   };
}
export default searchProducts;


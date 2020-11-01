import { SearchProductsQuery , SearchProductsQueryVariables } from '../../graphql/types';
import SearchProductsQueryDocument from './searchProductsQuery';
import { xApiClient } from '../../index';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function (options: any): Promise<any> {
  
  const { data } = await xApiClient.query<SearchProductsQuery, SearchProductsQueryVariables>({
    query: SearchProductsQueryDocument,
    variables: {
      storeId: "Electronics",
      userId: "et",
      currencyCode: "USD",
      cultureName: "en-US"
    }
  });
  return { 
    data: data.products.items,
    total: data.products.totalCount
   };
}

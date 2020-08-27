import { apolloClient } from '../../index';
import defaultProductSearchQuery from './defaultProductSearchQuery';
import defaultProductDetailsQuery from './defaultProductDetailsQuery';
import { SearchResult, Product, ProductsSearchParams} from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductList = async (searchParams: ProductsSearchParams): Promise<SearchResult> => {
  const filterParams = [];
  if (searchParams.sort) {
    filterParams.push({ id: 'sort', value: searchParams.sort });
  }
  if (searchParams.catId) {
    filterParams.push({ id: 'cgid', value: searchParams.catId });
  }
  const gqlSearchResult = await apolloClient.query<any>({
    query: defaultProductSearchQuery,
    variables: {
      filters: filterParams,
      query: ''
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return (gqlSearchResult.data.productSearch as SearchResult);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductDetails = async (searchParams: ProductsSearchParams): Promise<Product> => {
  const gqlProductDetails = await apolloClient.query<any>({
    query: defaultProductDetailsQuery,
    variables: {
      productId: searchParams.id,
      selectedColor: ''
    },
    // temporary, seems like bug in apollo:
    // @link: https://github.com/apollographql/apollo-client/issues/3234
    fetchPolicy: 'no-cache'
  });
  return (gqlProductDetails.data.product as Product);
};

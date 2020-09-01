import { apolloClient } from '../../index';
import normalizeCategoryId from '../../helpers/normalizeCategoryId';
import defaultProductSearchQuery from './defaultProductSearchQuery';
import defaultProductDetailsQuery from './defaultProductDetailsQuery';
import { SearchResult, Product, ProductsSearchParams, GqlProductDetailsResponse, GqlProductSearchResponse } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductList = async (searchParams: ProductsSearchParams): Promise<SearchResult> => {
  const filterParams = [];
  if (searchParams.sort) {
    filterParams.push({ id: 'sort', value: searchParams.sort });
  }
  if (searchParams.catId) {
    const normalizedCategoryId = normalizeCategoryId(((searchParams.catId as string).toLowerCase) ? searchParams.catId as string : searchParams.catId[0]);
    filterParams.push({ id: 'cgid', value: normalizedCategoryId });
  }
  if (searchParams.filters) {
    searchParams.filters.map(filter => {
      if (filter && filter.values) {
        filter.values.map(filterValue => {
          if (filterValue.selected) {
            filterParams.push({ id: filter.attributeId, value: filterValue.value });
          }
        });
      }
    });
  }
  if (searchParams.page) {
    filterParams.push({ id: 'offset', value: `${(searchParams.page - 1) * searchParams.perPage}` });
  }
  if (searchParams.perPage) {
    filterParams.push({ id: 'limit', value: `${searchParams.perPage}` });
  }

  const gqlSearchResult = await apolloClient.query<GqlProductSearchResponse>({
    query: defaultProductSearchQuery,
    variables: {
      filters: filterParams,
      query: ''
    }
  });
  return gqlSearchResult.data.productSearch;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductDetails = async (searchParams: ProductsSearchParams): Promise<Product> => {
  const gqlProductDetails = await apolloClient.query<GqlProductDetailsResponse>({
    query: defaultProductDetailsQuery,
    variables: {
      productId: searchParams.id,
      selectedColor: ''
    }
  });
  return gqlProductDetails.data.product;
};

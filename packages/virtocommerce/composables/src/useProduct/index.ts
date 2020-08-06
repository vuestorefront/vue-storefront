// import { enhanceProduct, mapPaginationParams, getFiltersFromProductsAttributes } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult, UseProduct, AgnosticSortByOption} from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import { Filter } from '@vue-storefront/virtocommerce-api/lib/types/filters';

const availableSortingOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

const productsSearch = async (params: ProductsSearchParams): Promise<ProductsSearchResult<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]>> => {
  console.info(`productsSearch: mock - return empty list - ${params}`);
  // const apiSearchParams: ProductSearch = {
  //   ...params,
  //   ...mapPaginationParams(params)
  // };
  //
  // const productResponse = await getProduct(apiSearchParams);
  // const enhancedProductResponse = enhanceProduct(productResponse);
  // const products = (enhancedProductResponse.data as any)._variants;
  // const availableFilters: Record<string, Filter> = getFiltersFromProductsAttributes(products);
  return {
    data: [],
    total: 0,
    availableFilters: {},
    availableSortingOptions
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant, Record<string, Filter>, AgnosticSortByOption[]> =
  useProductFactory<ProductVariant, ProductsSearchParams, Record<string, Filter>, AgnosticSortByOption[]>({ productsSearch });

export default useProduct;

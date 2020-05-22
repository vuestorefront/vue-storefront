import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct, mapPaginationParams, getFiltersFromProductsAttributes } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory, ProductsSearchResult, UseProduct } from '@vue-storefront/core';
import { ProductsSearchParams } from '../types';
import { ProductSearch, Filter } from '@vue-storefront/commercetools-api/lib/types/Api';

const productsSearch = async (params: ProductsSearchParams): Promise<ProductsSearchResult<ProductVariant, Record<string, Filter>>> => {
  const apiSearchParams: ProductSearch = {
    ...params,
    ...mapPaginationParams(params)
  };

  const productResponse = await getProduct(apiSearchParams);
  const enhancedProductResponse = enhanceProduct(productResponse);
  const products = (enhancedProductResponse.data as any)._variants;
  const availableFilters: Record<string, Filter> = getFiltersFromProductsAttributes(products);
  return {
    data: products,
    total: productResponse.data.products.total,
    availableFilters
  };
};

const sortByOptions = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-up', label: 'Price from low to high' },
  { value: 'price-down', label: 'Price from high to low' }
];

const useProduct: (cacheId: string) => UseProduct<ProductVariant, Record<string, Filter>> =
  useProductFactory<ProductVariant, ProductsSearchParams, Record<string, Filter>>({ productsSearch, sortByOptions });

export default useProduct;

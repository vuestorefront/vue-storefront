import { ProductsSearchParams } from '../types';
import { ProductVariant } from './../types/GraphQL';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { useProductFactory, UseProduct, Context, CustomQuery } from '@vue-storefront/core';

const productsSearch = async (context: Context, params: ProductsSearchParams & { customQuery?: CustomQuery }): Promise<ProductVariant[]> => {
  const { customQuery, ...searchParams } = params;

  const apiSearchParams = {
    ...searchParams,
    ...mapPaginationParams(searchParams)
  };

  const productResponse = await context.$ct.api.getProduct(apiSearchParams, customQuery);
  const enhancedProductResponse = enhanceProduct(productResponse, context);
  const products = (enhancedProductResponse.data as any)._variants;

  return products;
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant[], ProductsSearchParams> = useProductFactory<ProductVariant[], ProductsSearchParams>({
  productsSearch
});

export default useProduct;

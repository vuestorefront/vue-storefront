import { ProductsSearchParams } from '../types';
import { ProductVariant } from './../types/GraphQL';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { useProductFactory, UseProduct, CustomQuery, Context } from '@vue-storefront/core';

const productsSearch = async (context: Context, params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductVariant[]> => {
  const apiSearchParams = {
    ...params,
    ...mapPaginationParams(params)
  };

  const productResponse = await context.$ct.api.getProduct(apiSearchParams, customQuery);
  const enhancedProductResponse = enhanceProduct(productResponse);
  const products = (enhancedProductResponse.data as any)._variants;

  return products;
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant[]> = useProductFactory<ProductVariant[], ProductsSearchParams>({
  productsSearch
});

export default useProduct;

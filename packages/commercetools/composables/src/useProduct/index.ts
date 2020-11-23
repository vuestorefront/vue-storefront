import { ProductsSearchParams } from '../types';
import { ProductVariant } from './../types/GraphQL';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { useProductFactory, ProductsSearchResult, UseProduct, CustomQuery, Context } from '@vue-storefront/core';

const productsSearch = async (context: Context, params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductsSearchResult<ProductVariant>> => {
  const apiSearchParams = {
    ...params,
    ...mapPaginationParams(params)
  };

  const productResponse = await context.$ct.api.getProduct(apiSearchParams, customQuery);
  const enhancedProductResponse = enhanceProduct(productResponse);
  const products = (enhancedProductResponse.data as any)._variants;

  return {
    data: products,
    total: productResponse.data.products.total
  };
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant> = useProductFactory<ProductVariant, ProductsSearchParams>({
  productsSearch
});

export default useProduct;

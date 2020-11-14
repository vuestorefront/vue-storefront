import { ProductsSearchParams } from '../types';
import { ProductVariant } from './../types/GraphQL';
import { enhanceProduct, mapPaginationParams } from './../helpers/internals';
import { getProduct } from '@vue-storefront/commercetools-api';
import { useProductFactory, ProductsSearchResult, UseProduct, CustomQuery } from '@vue-storefront/core';

const factoryParams = {
  async productsSearch(params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductsSearchResult<ProductVariant>> {
    const apiSearchParams = {
      ...params,
      ...mapPaginationParams(params)
    };

    const productResponse = await this.api.getProduct(apiSearchParams, customQuery);
    const enhancedProductResponse = enhanceProduct(productResponse);
    const products = (enhancedProductResponse.data as any)._variants;

    return {
      data: products,
      total: productResponse.data.products.total
    };
  },
  api: {
    getProduct
  }
};

const useProduct: (cacheId: string) => UseProduct<ProductVariant> = useProductFactory<ProductVariant, ProductsSearchParams, any>(factoryParams);

export default useProduct;

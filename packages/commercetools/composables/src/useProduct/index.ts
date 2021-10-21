import { ProductsSearchParams } from '../types';
import { ProductVariant } from './../types/GraphQL';
import { enhanceProduct, mapPaginationParams, getChannelId } from './../helpers/internals';
import { useProductFactory, UseProduct, Context } from '@vue-storefront/core';

/**
 * @remarks References:
 * {@link ProductVariant}
 */
const useProductFactoryParams = {
  productsSearch: async (context: Context, { customQuery, ...searchParams }): Promise<ProductVariant[]> => {

    const apiSearchParams = {
      ...searchParams,
      ...mapPaginationParams(searchParams),
      channelId: getChannelId(context.$ct.config.store)
    };

    const productResponse = await context.$ct.api.getProduct(apiSearchParams, customQuery);
    const enhancedProductResponse = enhanceProduct(productResponse, context);
    const products = (enhancedProductResponse.data as any)._variants;

    return products;
  }
};

/**
 * @remarks References:
 * {@link ProductVariant}, {@link ProductsSearchParams}
 */
const useProduct: (cacheId: string) => UseProduct<ProductVariant[], ProductsSearchParams> = useProductFactory<ProductVariant[], ProductsSearchParams>(useProductFactoryParams);

export {
  useProduct,
  useProductFactoryParams
};

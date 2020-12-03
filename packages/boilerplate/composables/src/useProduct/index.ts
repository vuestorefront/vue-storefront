import {
  Context,
  CustomQuery,
  useProductFactory,
  ProductsSearchParams,
  ProductsSearchResult,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { UseProduct, Product } from '../types';

const params: UseProductFactoryParams<Product, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductsSearchResult<Product>> => {
    return await context.$boilerplate.api.getProduct(params, customQuery);
  }
};

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, any>(params);

export default useProduct;

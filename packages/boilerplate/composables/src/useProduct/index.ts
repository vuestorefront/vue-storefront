import {
  Context,
  CustomQuery,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams, customQuery?: CustomQuery): Promise<ProductsResponse> => {
    return await context.$boilerplate.api.getProduct(params, customQuery);
  }
};

export default useProductFactory<ProductsResponse, any>(params);

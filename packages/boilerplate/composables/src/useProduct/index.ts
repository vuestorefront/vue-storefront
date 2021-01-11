import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, any> = {
  productsSearch: async (context: Context, params: ProductsSearchParams): Promise<ProductsResponse> => {
    const { customQuery, ...searchParams } = params;

    return await context.$boilerplate.api.getProduct(searchParams, customQuery);
  }
};

export default useProductFactory<ProductsResponse, any>(params);

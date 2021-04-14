import {
  Context,
  useProductFactory,
  ProductsSearchParams,
  UseProductFactoryParams,
  CustomQuery
} from '@vue-storefront/core';
import { ProductsResponse } from '../types';

const params: UseProductFactoryParams<ProductsResponse, ProductsSearchParams> = {
  productsSearch: async (context: Context, params: ProductsSearchParams & { customQuery?: CustomQuery }): Promise<ProductsResponse> => {
    console.log('Mocked: productsSearch');
    const { customQuery, ...searchParams } = params;

    return await context.$boilerplate.api.getProduct(searchParams, customQuery);
  }
};

export default useProductFactory<ProductsResponse, ProductsSearchParams>(params);

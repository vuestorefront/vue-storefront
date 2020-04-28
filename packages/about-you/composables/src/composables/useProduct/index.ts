/* istanbul ignore file */
import { useProductFactory } from '@vue-storefront/core';
import { mapProductSearchByQueryParams } from '../../helpers';
import { UseProduct, BapiProduct } from '../../types';
import { getProductsByQuery } from '@vue-storefront/about-you-api';

const useProduct: (cacheId: string) => UseProduct<BapiProduct, any> = useProductFactory<BapiProduct, any, any>({
  productsSearch: async (params) => {
    const products = await getProductsByQuery(mapProductSearchByQueryParams(params));

    return {
      data: products.entities,
      total: products.pagination.total
    };
  }
});

export default useProduct;

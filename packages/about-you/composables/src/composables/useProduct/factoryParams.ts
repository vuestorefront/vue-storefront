import { BapiProduct } from '../../types';
import { getProductById, getProductsByQuery } from '@vue-storefront/about-you-api';
import { mapProductSearchByQueryParams, mapProductSearchBySingleProductParams } from '../../helpers';
import { UseProductFactoryParams } from '@vue-storefront/core';

export const params: UseProductFactoryParams<BapiProduct, any> = {
  productsSearch: async ({ id, ...params }) => {
    let products: { entities: Array<BapiProduct>; pagination: any};

    if (id) {
      const product = await getProductById(id, mapProductSearchBySingleProductParams(params));
      products = { entities: [product], pagination: { total: 1 } };
    } else {
      const productsQuery = mapProductSearchByQueryParams(params);
      products = await getProductsByQuery(productsQuery);
    }

    return {
      data: products.entities,
      total: products.pagination.total
    };
  }
};

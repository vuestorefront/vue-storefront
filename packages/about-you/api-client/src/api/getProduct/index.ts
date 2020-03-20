import { BapiProduct, GetProductSearchParams } from '../../types';

import { apiClient } from '../..';

export default async function(options: GetProductSearchParams = {}): Promise<BapiProduct[]> {
  if (options.ids) {
    return await apiClient.products.getByIds(
      options.ids,
      {
        with: options.with
      }
    );
  } else if (options.masterKey) {
    const { products } = await apiClient.masters.getByKey(
      options.masterKey,
      {
        with: {
          products: options.with
        }
      });
    return products;
  } else if (options.term) {
    const { products } = await apiClient.search.suggestions(
      options.term
    );
    return products;
  } else {
    const { entities } = await apiClient.products.query(
      {
        where: options.where,
        with: options.with,
        sort: options.sort,
        pagination: options.pagination
      });
    return entities;
  }
}

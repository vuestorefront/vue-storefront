import { BapiProduct, Filter } from '../../types';
import { getFilters, getProductById, getProductsByQuery } from '@vue-storefront/about-you-api';
import { mapProductSearchByQueryParams, mapProductSearchBySingleProductParams } from '../../helpers';
import { AgnosticSortByOption, UseProductFactoryParams } from '@vue-storefront/core';

const availableSortingOptions: AgnosticSortByOption[] = [
  { value: 'price-asc', label: 'Price from low to high' },
  { value: 'price-desc', label: 'Price from high to low' },
  { value: 'new-asc', label: 'Latest' },
  { value: 'reduction-desc', label: 'Discount from high to low' },
  { value: 'reduction-asc', label: 'Discount from low to hight' },
  { value: 'new-desc', label: 'Oldest' }
];

export const params: UseProductFactoryParams<BapiProduct, any, Record<string, Filter>, AgnosticSortByOption[]> = {
  productsSearch: async ({id, ...params}) => {
    let products: { entities: Array<BapiProduct>; pagination: any};
    let filters;

    if (id) {
      const product = await getProductById(id, mapProductSearchBySingleProductParams(params));
      products = { entities: [product], pagination: { total: 1 } };
    } else {
      const productsQuery = mapProductSearchByQueryParams(params);
      products = await getProductsByQuery(productsQuery);

      const filtersResult = await getFilters({ where: productsQuery.where });
      const availableFilters = filtersResult.filter(filter => filter.values.length !== 0);
      filters = availableFilters.reduce((obj, item: any) => {
        const { slug, values, ...rest} = item;
        return {
          ...obj,
          [slug]: {
            ...rest,
            slug,
            options: values.map(value => ({ ...value, selected: false })),
            type: item.type
          }
        };
      }, {});
    }

    return {
      data: products.entities,
      total: products.pagination.total,
      availableFilters: filters,
      availableSortingOptions
    };
  }
};

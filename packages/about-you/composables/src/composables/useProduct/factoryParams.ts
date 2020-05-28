import {BapiProduct, ProductSearchQuery} from '../../types';
import {getFilters, getProductById, getProductsByQuery} from '@vue-storefront/about-you-api';
import {mapProductSearchByQueryParams, mapProductSearchBySingleProductParams} from '../../helpers';
import {UseProductFactoryParams} from '../../factories';

export const factoryParams: UseProductFactoryParams<BapiProduct, any, any, ProductSearchQuery> = {
  productsSearch: async ({id, ...params}) => {
    let products: { entities: Array<BapiProduct>; pagination: any};

    if (id) {
      const product = await getProductById(id, mapProductSearchBySingleProductParams(params));
      products = { entities: [product], pagination: { total: 1 } };
    } else {
      products = await getProductsByQuery(mapProductSearchByQueryParams(params));
    }

    return {
      data: products.entities,
      total: products.pagination.total
    };
  },
  availableFilters: async (initialSearchQuery: ProductSearchQuery) => {
    const filters = await getFilters({ where: initialSearchQuery });
    const availableFilters = filters.filter(filter => filter.values.length !== 0);
    return availableFilters.reduce((obj, item: any) => {
      const { slug, values, ...rest} = item;
      return {
        ...obj,
        [slug]: {
          ...rest,
          slug,
          options: values.map(value => ({...value, selected: false})),
          type: item.type
        }
      };
    }, {});
  }
};

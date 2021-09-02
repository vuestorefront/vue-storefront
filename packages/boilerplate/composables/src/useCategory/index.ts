import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import type { Category } from '@vue-storefront/boilerplate-api';
import type {
  UseCategorySearchParams as SearchParams
} from '../types';

const params: UseCategoryFactoryParams<Category, SearchParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  categorySearch: async (context: Context, { customQuery, ...params }) => {
    console.log('Mocked: useCategory.categorySearch');

    return [
      {
        id: 1,
        name: 'Women',
        slug: 'women',
        items: []
      },
      {
        id: 2,
        name: 'Men',
        slug: 'men',
        items: []
      },
      {
        id: 3,
        name: 'Kids',
        slug: 'kids',
        items: []
      }
    ];
  }
};

export const useCategory = useCategoryFactory<Category, SearchParams>(params);

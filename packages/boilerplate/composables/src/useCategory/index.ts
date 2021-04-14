import {
  Context,
  CustomQuery,
  useCategoryFactory,
  UseCategoryFactoryParams,
  CategorySearchParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, CategorySearchParams> = {
  categorySearch: async (context: Context, params: CategorySearchParams & { customQuery?: CustomQuery }) => {
    console.log('Mocked: categorySearch');
    const { customQuery, ...searchParams } = params;

    return await context.$boilerplate.api.getCategory(searchParams, customQuery);
  }
};

export default useCategoryFactory<Category, CategorySearchParams>(params);

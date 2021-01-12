import {
  Context,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {
    const { customQuery, ...searchParams } = params;

    return await context.$boilerplate.api.getCategory(searchParams, customQuery);
  }
};

export default useCategoryFactory<Category, any>(params);

import {
  Context,
  CustomQuery,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params, customQuery?: CustomQuery) => {
    return await context.$boilerplate.api.getCategory(params, customQuery);
  }
};

export default useCategoryFactory<Category, any>(params);

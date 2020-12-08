import {
  Context,
  CustomQuery,
  UseCategory,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params, customQuery?: CustomQuery) => {
    return await context.$boilerplate.api.getCategory(params, customQuery);
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;

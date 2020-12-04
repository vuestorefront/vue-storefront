import {
  Context,
  CustomQuery,
  UseCategory,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from './../types/GraphQL';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params, customQuery?: CustomQuery) => {
    const categoryResponse = await context.$ct.api.getCategory(params, customQuery);
    return categoryResponse.data.categories.results;
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;

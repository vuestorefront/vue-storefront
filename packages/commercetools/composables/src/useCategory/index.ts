import {
  Context,
  UseCategory,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from '@vue-storefront/commercetools-api';

const useCategoryFactoryParams: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, { customQuery, ...searchParams }) => {
    const categoryResponse = await context.$ct.api.getCategory(searchParams, customQuery);
    return categoryResponse.data.categories.results;
  }
};

const useCategory: (id: string) => UseCategory<Category, any> = useCategoryFactory<Category, any>(useCategoryFactoryParams);

export {
  useCategory,
  useCategoryFactoryParams
};

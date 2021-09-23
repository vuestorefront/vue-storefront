import {
  Context,
  UseCategory,
  useCategoryFactory,
  UseCategoryFactoryParams
} from '@vue-storefront/core';
import { Category } from './../types/GraphQL';

/**
 * @remarks References:
 * {@link Category}
 */
const useCategoryFactoryParams: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, { customQuery, ...searchParams }) => {
    const categoryResponse = await context.$ct.api.getCategory(searchParams, customQuery);
    return categoryResponse.data.categories.results;
  }
};

/**
 * @remarks References:
 * {@link Category}
 */
const useCategory: (id: string) => UseCategory<Category, any> = useCategoryFactory<Category, any>(useCategoryFactoryParams);

export {
  useCategory,
  useCategoryFactoryParams
};

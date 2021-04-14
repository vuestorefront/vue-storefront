import {
  Context,
  UseCategory,
  useCategoryFactory,
  UseCategoryFactoryParams,
  CategorySearchParams
} from '@vue-storefront/core';
import { Category } from './../types/GraphQL';

const params: UseCategoryFactoryParams<Category, CategorySearchParams> = {
  categorySearch: async (context: Context, { customQuery, ...searchParams }) => {
    const categoryResponse = await context.$ct.api.getCategory(searchParams, customQuery);
    return categoryResponse.data.categories.results;
  }
};

const useCategory: (id: string) => UseCategory<Category, CategorySearchParams> = useCategoryFactory<Category, CategorySearchParams>(params);

export default useCategory;

import { CustomQuery, UseCategory } from '@vue-storefront/core';
import { Category } from './../types/GraphQL';
import { useCategoryFactory, UseCategoryFactoryParams, Context } from '@vue-storefront/core';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params, customQuery?: CustomQuery) => {
    const categoryResponse = await context.$api.getCategory(params, customQuery);
    return categoryResponse.data.categories.results;
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;

import { CustomQuery, UseCategory } from '@vue-storefront/core';
import { getCategory } from '@vue-storefront/commercetools-api';
import { Category } from './../types/GraphQL';
import { useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context, params, customQuery?: CustomQuery) => {
    const categoryResponse = await getCategory(context, params, customQuery);
    return categoryResponse.data.categories.results;
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;

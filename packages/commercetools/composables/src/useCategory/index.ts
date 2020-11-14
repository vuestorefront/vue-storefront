import { CustomQuery, UseCategory } from '@vue-storefront/core';
import { getCategory } from '@vue-storefront/commercetools-api';
import { Category } from './../types/GraphQL';
import { useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';

const params: UseCategoryFactoryParams<Category, any, any> = {
  async categorySearch(params, customQuery?: CustomQuery) {
    const categoryResponse = await this.api.getCategory(params, customQuery);
    return categoryResponse.data.categories.results;
  },
  api: {
    getCategory
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any, any>(params);

export default useCategory;

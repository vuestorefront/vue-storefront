import { UseCategory } from '@vue-storefront/core';
import { Category } from './../types/GraphQL';
import { useCategoryFactory, UseCategoryFactoryParams } from '@vue-storefront/core';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (params) => {
    console.info(`categorySearch: mock - return empty list - ${params}`);
    return [];
  }
};

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>(params);

export default useCategory;

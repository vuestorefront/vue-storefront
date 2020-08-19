import { getCategory } from '@vue-storefront/shopify-api';
import { useCategoryFactory } from '@vue-storefront/core';
import { UseCategory, Category } from '../../types';

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>({
  categorySearch: async (params) => JSON.parse(JSON.stringify(await getCategory(params)))
});

export default useCategory;

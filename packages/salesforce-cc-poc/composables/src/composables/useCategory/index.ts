import { getCategory } from '@vue-storefront/salesforce-cc-poc-api';
import { useCategoryFactory } from '@vue-storefront/core';
import { UseCategory, Category } from '../../types';

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>({
  categorySearch: getCategory
});

export default useCategory;

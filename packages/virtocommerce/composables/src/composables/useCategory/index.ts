import { useCategoryFactory, Context } from '@vue-storefront/core';
import { UseCategory, Category } from '../../types';

const useCategory: (id: string) => UseCategory<Category> = useCategoryFactory<Category, any>({
  categorySearch: async (context: Context) => {
    const categoryResponse = await context.$vc.api.getCategory(context);
    return categoryResponse;
  }
});

export default useCategory;

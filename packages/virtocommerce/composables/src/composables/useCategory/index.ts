import { useCategoryFactory, Context, UseCategoryFactoryParams } from '@vue-storefront/core';
import { UseCategory, Category } from '../../types';

const params: UseCategoryFactoryParams<Category, any> = {
  categorySearch: async (context: Context, params) => {
    const categoryResponse = await context.$vc.api.getCategory(context);
    return categoryResponse;
  }
};


export default useCategoryFactory<Category, any>(params);

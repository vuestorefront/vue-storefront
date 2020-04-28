import { getCategoryByPath } from '@vue-storefront/about-you-api';
import { UseCategoryFactoryParams} from '@vue-storefront/core';
import { BapiCategory } from '../../types';
import { mapCategorySearchByPathParams } from '../../helpers';

export const params: UseCategoryFactoryParams<BapiCategory, any> = {
  categorySearch: async (params) => {
    const result = await getCategoryByPath(params.path, mapCategorySearchByPathParams(params));
    return [result];
  }
};

/* istanbul ignore file */
import { getCategoryByPath } from '@vue-storefront/about-you-api';
import { useCategoryFactory } from '@vue-storefront/core';
import { UseCategory, BapiCategory } from '../../types';
import mapCategorySearchByPathParams from '../../helpers/category/mapCategorySearchByPathParams';

const useCategory: (id: string) => UseCategory<BapiCategory> = useCategoryFactory<BapiCategory, any>({
  categorySearch: async (params) => {
    const result = await getCategoryByPath(params.path, mapCategorySearchByPathParams(params));
    return [result];
  }
});

export default useCategory;

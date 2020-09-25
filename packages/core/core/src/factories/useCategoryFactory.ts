import { UseCategory } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef } from '../utils';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS, CUSTOM_QUERY = any> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS, customQuery: CUSTOM_QUERY) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, CUSTOM_QUERY = any>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS, CUSTOM_QUERY>
) {
  return function useCategory(id: string): UseCategory<CATEGORY, CUSTOM_QUERY> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);

    const search = async (params: CATEGORY_SEARCH_PARAMS, customQuery?: CUSTOM_QUERY) => {
      loading.value = true;
      categories.value = await factoryParams.categorySearch(params, customQuery);
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}

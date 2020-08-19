import { UseCategory } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { ssrRef } from '../utils';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(id: string): UseCategory<CATEGORY> {
    const categories: Ref<CATEGORY[]> = ssrRef([], `useCategory-categories-${id}`);
    const loading = ssrRef(false, `useCategory-loading-${id}`);

    const search = async (params: CATEGORY_SEARCH_PARAMS) => {
      loading.value = true;
      categories.value = await factoryParams.categorySearch(params);
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}

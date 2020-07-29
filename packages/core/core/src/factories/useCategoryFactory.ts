import { UseCategory } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { ssrRef } from 'nuxt-composition-api';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(): UseCategory<CATEGORY> {
    const categories: Ref<CATEGORY[]> = ssrRef([]);
    const loading = ssrRef(false);

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

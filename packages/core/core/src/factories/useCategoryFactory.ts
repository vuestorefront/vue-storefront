import { UseCategory } from '../types';
import { useSSR } from '../utils';
import { ref, Ref, computed } from '@vue/composition-api';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(cacheId?: string): UseCategory<CATEGORY> {
    const { initialState, saveToInitialState } = useSSR(cacheId);
    const categories: Ref<CATEGORY[]> = ref(initialState || []);
    const loading = ref(false);

    const search = async (params: CATEGORY_SEARCH_PARAMS) => {
      if (!initialState) {
        loading.value = true;
      }
      categories.value = await factoryParams.categorySearch(params);
      saveToInitialState(categories.value);
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}

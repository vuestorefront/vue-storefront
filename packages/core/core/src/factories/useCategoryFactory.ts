import { CustomQuery, UseCategory } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef } from '../utils';

export type UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> = {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS, customQuery: CustomQuery) => Promise<CATEGORY[]>;
};

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(id: string): UseCategory<CATEGORY> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);

    const search = async (params: CATEGORY_SEARCH_PARAMS, customQuery?: CustomQuery) => {
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

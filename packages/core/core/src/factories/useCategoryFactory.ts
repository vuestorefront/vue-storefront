import { CustomQuery, UseCategory, BaseFactoryParams } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, createFactoryParams } from '../utils';

export interface UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS, API> extends BaseFactoryParams<API> {
  categorySearch: (searchParams: CATEGORY_SEARCH_PARAMS, customQuery: CustomQuery) => Promise<CATEGORY[]>;
}

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, API>(
  rawFactoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS, API>
) {
  return function useCategory(id: string): UseCategory<CATEGORY> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);
    const factoryParams = createFactoryParams(rawFactoryParams);

    const search = async (params: CATEGORY_SEARCH_PARAMS, customQuery?: CustomQuery) => {
      Logger.debug('useCategory.search', params);

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

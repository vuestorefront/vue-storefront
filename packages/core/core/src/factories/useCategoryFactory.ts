import { CustomQuery, UseCategory, Context, FactoryParams } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';
import { markCustomQueryDeprecated } from '../helpers';

export interface UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> extends FactoryParams {
  categorySearch: (context: Context, params: CATEGORY_SEARCH_PARAMS & { customQuery?: CustomQuery }, oldCustomQuery?: CustomQuery) => Promise<CATEGORY[]>;
}

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(id: string): UseCategory<CATEGORY> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);
    const context = generateContext(factoryParams);

    const search = async (searchParams: CATEGORY_SEARCH_PARAMS, customQuery?: CustomQuery) => {
      Logger.debug('useCategory.search', searchParams);

      loading.value = true;
      categories.value = await factoryParams.categorySearch(context, { ...searchParams, customQuery }, markCustomQueryDeprecated(customQuery));
      loading.value = false;
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value)
    };
  };
}

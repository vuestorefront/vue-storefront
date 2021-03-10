import { CustomQuery, UseCategory, Context, FactoryParams, UseCategoryErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS> extends FactoryParams {
  categorySearch: (context: Context, params: CATEGORY_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<CATEGORY[]>;
}

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS>
) {
  return function useCategory(id: string): UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseCategoryErrors> = sharedRef({}, `useCategory-error-${id}`);

    const search = async (searchParams) => {
      Logger.debug(`useCategory/${id}/search`, searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        categories.value = await _factoryParams.categorySearch(searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error(`useCategory/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value),
      error: computed(() => error.value)
    };
  };
}

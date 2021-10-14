import { CustomQuery, UseCategory, Context, FactoryParams, UseCategoryErrors, PlatformApi } from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseCategoryFactoryParams<
  CATEGORY,
  CATEGORY_SEARCH_PARAMS,
  API extends PlatformApi = any
> extends FactoryParams<API> {
  categorySearch: (context: Context, params: CATEGORY_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<CATEGORY[]>;
}

export function useCategoryFactory<CATEGORY, CATEGORY_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseCategoryFactoryParams<CATEGORY, CATEGORY_SEARCH_PARAMS, API>
) {
  return function useCategory(id: string): UseCategory<CATEGORY, CATEGORY_SEARCH_PARAMS, API> {
    const categories: Ref<CATEGORY[]> = sharedRef([], `useCategory-categories-${id}`);
    const loading = sharedRef(false, `useCategory-loading-${id}`);
    const error: Ref<UseCategoryErrors> = sharedRef({
      search: null
    }, `useCategory-error-${id}`);

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: categories, alias: 'currentCategories', loading, error }
    );

    const search = async (searchParams) => {
      Logger.debug(`useCategory/${id}/search`, searchParams);

      try {
        loading.value = true;
        categories.value = await _factoryParams.categorySearch(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useCategory/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      api: _factoryParams.api,
      search,
      loading: computed(() => loading.value),
      categories: computed(() => categories.value),
      error: computed(() => error.value)
    };
  };
}

import { CustomQuery, UseSearch, Context, FactoryParams, UseSearchErrors } from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';

export interface UseSearchFactoryParams<RESULT, SEARCH_PARAMS> extends FactoryParams {
  search: (context: Context, params: SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<RESULT>;
}

export function useSearchFactory<RESULT, SEARCH_PARAMS>(
  factoryParams: UseSearchFactoryParams<RESULT, SEARCH_PARAMS>
) {
  return function useSearch(id: string): UseSearch<RESULT, SEARCH_PARAMS> {
    const result: Ref<RESULT> = sharedRef([], `useSearch-products-${id}`);
    const loading = sharedRef(false, `useSearch-loading-${id}`);
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseSearchErrors> = sharedRef({
      search: null
    }, `useSearch-error-${id}`);

    const search = async (searchParams) => {
      Logger.debug(`useSearch/${id}/search`, searchParams);

      try {
        loading.value = true;
        result.value = await _factoryParams.search(searchParams);
        error.value.search = null;
      } catch (err) {
        error.value.search = err;
        Logger.error(`useSearch/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}

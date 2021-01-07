import { Ref, computed } from '@vue/composition-api';
import { sharedRef, vsfRef, Logger, generateContext } from '../utils';
import { UseFacet, FacetSearchResult, AgnosticFacetSearchParams, Context, FactoryParams, UseFacetErrors } from '../types';

interface UseFacetFactoryParams<SEARCH_DATA> extends FactoryParams {
  search: (context: Context, params?: FacetSearchResult<SEARCH_DATA>) => Promise<SEARCH_DATA>;
}

const useFacetFactory = <SEARCH_DATA>(factoryParams: UseFacetFactoryParams<SEARCH_DATA>) => {

  const useFacet = (id?: string): UseFacet<SEARCH_DATA> => {
    const ssrKey = id || 'useFacet';
    const loading: Ref<boolean> = vsfRef(false, `${ssrKey}-loading`);
    const result: Ref<FacetSearchResult<SEARCH_DATA>> = vsfRef({ data: null, input: null }, `${ssrKey}-facets`);
    const context = generateContext(factoryParams);
    const error: Ref<UseFacetErrors> = sharedRef({}, `useFacet-error-${id}`);

    const search = async (params?: AgnosticFacetSearchParams) => {
      Logger.debug('useFacet.search', params);

      result.value.input = params;
      try {
        loading.value = true;
        error.value.search = null;
        result.value.data = await factoryParams.search(context, result.value);
      } catch (err) {
        error.value.search = err;
        Logger.error(`useFacet/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      search
    };
  };

  return useFacet;
};

export { useFacetFactory };

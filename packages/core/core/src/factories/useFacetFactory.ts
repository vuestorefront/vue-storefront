import { Ref, computed } from '@vue/composition-api';
import { vsfRef, Logger, generateContext } from '../utils';
import { UseFacet, FacetSearchResult, AgnosticFacetSearchParams, Context, FactoryParams } from '../types';

interface UseFacetFactoryParams<SEARCH_DATA> extends FactoryParams {
  search: (context: Context, params?: FacetSearchResult<SEARCH_DATA>) => Promise<SEARCH_DATA>;
}

const useFacetFactory = <SEARCH_DATA>(factoryParams: UseFacetFactoryParams<SEARCH_DATA>) => {

  const useFacet = (id?: string): UseFacet<SEARCH_DATA> => {
    const ssrKey = id || 'useFacet';
    const loading: Ref<boolean> = vsfRef(false, `${ssrKey}-loading`);
    const result: Ref<FacetSearchResult<SEARCH_DATA>> = vsfRef({ data: null, input: null }, `${ssrKey}-facets`);
    const context = generateContext(factoryParams);

    const search = async (params?: AgnosticFacetSearchParams) => {
      Logger.debug('useFacet.search', params);

      result.value.input = params;
      loading.value = true;
      result.value.data = await factoryParams.search(context, result.value);
      loading.value = false;
    };

    return {
      result: computed(() => result.value),
      loading: computed(() => loading.value),
      search
    };
  };

  return useFacet;
};

export { useFacetFactory };

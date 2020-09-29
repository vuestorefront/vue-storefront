import { Ref, computed } from '@vue/composition-api';
import { vsfRef, Logger } from '../utils';
import { UseFacet, FacetSearchResult, AgnosticFacetSearchParams } from '../types';

interface UseFacetFactoryParams<SEARCH_DATA> {
  search: (params?: FacetSearchResult<SEARCH_DATA>) => Promise<SEARCH_DATA>;
}

const useFacetFactory = <SEARCH_DATA>(factoryParams: UseFacetFactoryParams<SEARCH_DATA>) => {

  const useFacet = (id?: string): UseFacet<SEARCH_DATA> => {
    const ssrKey = id || 'useFacet';
    const loading: Ref<boolean> = vsfRef(false, `${ssrKey}-loading`);
    const result: Ref<FacetSearchResult<SEARCH_DATA>> = vsfRef({ data: null, input: null }, `${ssrKey}-facets`);

    const search = async (params?: AgnosticFacetSearchParams) => {
      Logger.debug('useFacet.search', params);

      result.value.input = params;
      loading.value = true;
      result.value.data = await factoryParams.search(result.value);
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

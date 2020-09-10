import { Ref, computed } from '@vue/composition-api';
import { vsfRef } from '../utils';
import { UseFacet, FacetSearchData } from '../types';

interface UseFacetFactoryParams<SEARCH_DATA, SEARCH_INPUT> {
  search: (params?: FacetSearchData<SEARCH_DATA, SEARCH_INPUT>) => Promise<SEARCH_DATA>;
}

const useFacetFactory = <SEARCH_DATA, SEARCH_INPUT>(factoryParams: UseFacetFactoryParams<SEARCH_DATA, SEARCH_INPUT>) => {

  const useFacet = (): UseFacet<SEARCH_DATA, SEARCH_INPUT> => {
    const loading: Ref<boolean> = vsfRef(false, 'useFacet-loading');
    const searchData: Ref<FacetSearchData<SEARCH_DATA, SEARCH_INPUT>> = vsfRef({ data: null, input: null }, 'useFacet-facets');

    const search = async (params?: SEARCH_INPUT) => {
      searchData.value.input = params;
      loading.value = true;
      searchData.value.data = await factoryParams.search(searchData.value);
      loading.value = false;
    };

    return {
      searchData: computed(() => searchData.value),
      loading: computed(() => loading.value),
      search
    };
  };

  return useFacet;
};

export { useFacetFactory };

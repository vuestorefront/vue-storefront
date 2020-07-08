import { UseSearch } from '../types';
import { ref, Ref, computed } from '@vue/composition-api';

export type UseSearchFactoryParams<SEARCH_RESULTS, SEARCH_PARAMS> = {
  search: (searchParams: SEARCH_PARAMS) => Promise<SEARCH_RESULTS>;
};

export function useSearchFactory<SEARCH_RESULTS, SEARCH_PARAMS>(
  factoryParams: UseSearchFactoryParams<SEARCH_RESULTS, SEARCH_PARAMS>
) {
  return function useSearch(): UseSearch<SEARCH_RESULTS, SEARCH_PARAMS> {
    const results: Ref<SEARCH_RESULTS> = ref(null);
    const loading = ref(false);

    const search = async (params: SEARCH_PARAMS) => {
      loading.value = true;
      try {
        results.value = await factoryParams.search(params);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      searchResults: computed(() => results.value),
      loading: computed(() => loading.value)
    };
  };
}

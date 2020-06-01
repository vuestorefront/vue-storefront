import { UseProduct } from '../types';
import { ref, Ref, computed } from '@vue/composition-api';
import { useSSR } from '../utils';

type SearchParams = {
  perPage?: number;
  page?: number;
  sort?: any;
  term?: any;
  filters?: any;
}

export interface ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
  data: PRODUCT[];
  total: number;
  availableFilters?: PRODUCT_FILTERS;
  availableSortingOptions?: SORTING_OPTIONS;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams, PRODUCT_FILTERS, SORTING_OPTIONS> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORTING_OPTIONS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORTING_OPTIONS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
    const { initialState, saveToInitialState } = useSSR(cacheId);
    const products: Ref<PRODUCT[]> = ref(initialState?.data || []);
    const totalProducts: Ref<number> = ref(initialState?.total || 0);
    const filters: Ref<PRODUCT_FILTERS> = ref(initialState?.availableFilters || null);
    const sortingOptions: Ref<SORTING_OPTIONS> = ref(initialState?.availableSortingOptions || null);
    const loading = ref(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      if (!initialState) {
        loading.value = true;
      }
      filters.value = null;
      try {
        const { data, total, availableFilters, availableSortingOptions } = await factoryParams.productsSearch(params);
        products.value = data;
        totalProducts.value = total;
        filters.value = availableFilters || null;
        sortingOptions.value = availableSortingOptions || null;
        saveToInitialState({ data, total, availableFilters, availableSortingOptions });
      } finally {
        loading.value = false;
      }
    };

    return {
      products: computed(() => products.value),
      availableFilters: computed(() => filters.value),
      totalProducts: computed(() => totalProducts.value),
      search,
      availableSortingOptions: computed(() => sortingOptions.value),
      loading: computed(() => loading.value)
    };
  };
}

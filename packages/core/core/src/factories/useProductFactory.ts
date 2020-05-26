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

export interface ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORT_BY_OPTIONS> {
  data: PRODUCT[];
  total: number;
  availableFilters?: PRODUCT_FILTERS;
  availableSortByOptions?: SORT_BY_OPTIONS;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams, PRODUCT_FILTERS, SORT_BY_OPTIONS> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORT_BY_OPTIONS>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORT_BY_OPTIONS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORT_BY_OPTIONS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT, PRODUCT_FILTERS, SORT_BY_OPTIONS> {
    const { initialState, saveToInitialState } = useSSR(cacheId);
    const products: Ref<PRODUCT[]> = ref(initialState?.data || []);
    const totalProducts: Ref<number> = ref(initialState?.total || 0);
    const filters: Ref<PRODUCT_FILTERS> = ref(initialState?.availableFilters || null);
    const sortByOptions: Ref<SORT_BY_OPTIONS> = ref(initialState?.availableSortByOptions || null);
    const loading = ref(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      if (!initialState) {
        loading.value = true;
      }
      filters.value = null;
      try {
        const { data, total, availableFilters, availableSortByOptions } = await factoryParams.productsSearch(params);
        products.value = data;
        totalProducts.value = total;
        filters.value = availableFilters || null;
        sortByOptions.value = availableSortByOptions || null;
        saveToInitialState({ data, total, availableFilters, availableSortByOptions });
      } finally {
        loading.value = false;
      }
    };

    return {
      products: computed(() => products.value),
      availableFilters: computed(() => filters.value),
      totalProducts: computed(() => totalProducts.value),
      search,
      availableSortByOptions: computed(() => sortByOptions.value),
      loading: computed(() => loading.value)
    };
  };
}

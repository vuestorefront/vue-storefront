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

export interface ProductsSearchResult<PRODUCT, PRODUCT_FILTERS> {
  data: PRODUCT[];
  total: number;
  availableFilters?: PRODUCT_FILTERS;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams, PRODUCT_FILTERS> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<ProductsSearchResult<PRODUCT, PRODUCT_FILTERS>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT, PRODUCT_FILTERS> {
    const { initialState, saveToInitialState } = useSSR(cacheId);
    const products: Ref<PRODUCT[]> = ref(initialState?.data || []);
    const totalProducts: Ref<number> = ref(initialState?.total || 0);
    const filters: Ref<PRODUCT_FILTERS> = ref(initialState?.availableFilters || null);
    const loading = ref(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      if (!initialState) {
        loading.value = true;
      }
      filters.value = null;
      try {
        const { data, total, availableFilters } = await factoryParams.productsSearch(params);
        products.value = data;
        totalProducts.value = total;
        filters.value = availableFilters || null;
        saveToInitialState({ data, total, availableFilters });
      } finally {
        loading.value = false;
      }
    };

    return {
      products: computed(() => products.value),
      totalProducts: computed(() => totalProducts.value),
      availableFilters: computed(() => filters.value),
      search,
      loading: computed(() => loading.value)
    };
  };
}

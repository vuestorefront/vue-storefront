import { UseProduct } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { ssrRef } from 'nuxt-composition-api';

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
  return function useProduct(): UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
    const products: Ref<PRODUCT[]> = ssrRef([]);
    const totalProducts: Ref<number> = ssrRef(0);
    const filters: Ref<PRODUCT_FILTERS> = ssrRef(null);
    const sortingOptions: Ref<SORTING_OPTIONS> = ssrRef(null);
    const loading = ssrRef(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      loading.value = true;
      filters.value = null;
      try {
        const { data, total, availableFilters, availableSortingOptions } = await factoryParams.productsSearch(params);
        products.value = data;
        totalProducts.value = total;
        filters.value = availableFilters || null;
        sortingOptions.value = availableSortingOptions || null;
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

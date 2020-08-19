import { UseProduct } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { ssrRef } from '../utils';

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
  return function useProduct(id: string): UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
    const products: Ref<PRODUCT[]> = ssrRef([], `useProduct-products-${id}`);
    const totalProducts: Ref<number> = ssrRef(0, `useProduct-totalProducts-${id}`);
    const filters: Ref<PRODUCT_FILTERS> = ssrRef(null, `useProduct-filters-${id}`);
    const sortingOptions: Ref<SORTING_OPTIONS> = ssrRef(null, `useProduct-sortingOptions-${id}`);
    const loading = ssrRef(false, `useProduct-loading-${id}`);

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

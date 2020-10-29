import { CustomQuery, SearchParams, UseProduct } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger } from '../utils';

export interface ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
  data: PRODUCT[];
  total: number;
  availableFilters?: PRODUCT_FILTERS;
  availableSortingOptions?: SORTING_OPTIONS;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams, PRODUCT_FILTERS, SORTING_OPTIONS> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<ProductsSearchResult<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORTING_OPTIONS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS, PRODUCT_FILTERS, SORTING_OPTIONS>
) {
  return function useProduct(id: string): UseProduct<PRODUCT, PRODUCT_FILTERS, SORTING_OPTIONS> {
    const products: Ref<PRODUCT[]> = sharedRef([], `useProduct-products-${id}`);
    const totalProducts: Ref<number> = sharedRef(0, `useProduct-totalProducts-${id}`);
    const filters: Ref<PRODUCT_FILTERS> = sharedRef(null, `useProduct-filters-${id}`);
    const sortingOptions: Ref<SORTING_OPTIONS> = sharedRef(null, `useProduct-sortingOptions-${id}`);
    const loading = sharedRef(false, `useProduct-loading-${id}`);

    const search = async (params: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery) => {
      Logger.debug('useProduct.search', params);

      loading.value = true;
      filters.value = null;
      try {
        const { data, total, availableFilters, availableSortingOptions } = await factoryParams.productsSearch(params, customQuery);
        products.value = data;
        totalProducts.value = total;
        filters.value = availableFilters || null;
        sortingOptions.value = availableSortingOptions || null;
      } catch (e) {
        Logger.error('useProduct.search', e);
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

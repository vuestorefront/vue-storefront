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

export interface ProductsSearchResult<PRODUCT> {
  data: PRODUCT[];
  total: number;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends SearchParams> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS) => Promise<ProductsSearchResult<PRODUCT>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(cacheId: string): UseProduct<PRODUCT> {
    const { initialState, saveToInitialState } = useSSR(cacheId);
    const products: Ref<PRODUCT[]> = ref(initialState?.data || []);
    const totalProducts: Ref<number> = ref(initialState?.total || 0);
    const loading = ref(false);

    const search = async (params: PRODUCT_SEARCH_PARAMS) => {
      if (!initialState) {
        loading.value = true;
      }
      const { data, total } = await factoryParams.productsSearch(params);
      products.value = data;
      totalProducts.value = total;
      saveToInitialState({ data, total });
      loading.value = false;
    };

    return {
      products: computed(() => products.value),
      totalProducts: computed(() => totalProducts.value),
      search,
      loading: computed(() => loading.value)
    };
  };
}

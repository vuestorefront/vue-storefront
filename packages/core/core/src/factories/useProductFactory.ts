import { CustomQuery, ProductsSearchParams, UseProduct } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger } from '../utils';

export interface ProductsSearchResult<PRODUCT> {
  data: PRODUCT[];
  total: number;
}

export type UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS extends ProductsSearchParams> = {
  productsSearch: (searchParams: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery) => Promise<ProductsSearchResult<PRODUCT>>;
};

export function useProductFactory<PRODUCT, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCT, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(id: string): UseProduct<PRODUCT> {
    const products: Ref<PRODUCT[]> = sharedRef([], `useProduct-products-${id}`);
    const totalProducts: Ref<number> = sharedRef(0, `useProduct-totalProducts-${id}`);
    const loading = sharedRef(false, `useProduct-loading-${id}`);

    const search = async (params: PRODUCT_SEARCH_PARAMS, customQuery?: CustomQuery) => {
      Logger.debug('useProduct.search', params);

      loading.value = true;
      try {
        const { data, total } = await factoryParams.productsSearch(params, customQuery);
        products.value = data;
        totalProducts.value = total;
      } catch (e) {
        Logger.error('useProduct.search', e);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      products: computed(() => products.value),
      totalProducts: computed(() => totalProducts.value),
      loading: computed(() => loading.value)
    };
  };
}

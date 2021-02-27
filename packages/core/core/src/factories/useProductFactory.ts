import { CustomQuery, ProductsSearchParams, UseProduct, Context, FactoryParams, UseProductErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';
export interface UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS extends ProductsSearchParams> extends FactoryParams {
  productsSearch: (context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useProductFactory<PRODUCTS, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(id: string): UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS> {
    const products: Ref<PRODUCTS> = sharedRef([], `useProduct-products-${id}`);
    const loading = sharedRef(false, `useProduct-loading-${id}`);
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UseProductErrors> = sharedRef({}, `useProduct-error-${id}`);

    const search = async (searchParams) => {
      Logger.debug(`useProduct/${id}/search`, searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        products.value = await _factoryParams.productsSearch(searchParams);
      } catch (err) {
        error.value.search = err;
        Logger.error(`useProduct/${id}/search`, err);
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      products: computed(() => products.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value)
    };
  };
}

import {
  CustomQuery,
  ProductsSearchParams,
  UseProduct,
  Context,
  FactoryParams,
  UseProductErrors,
  PlatformApi
} from '../types';
import { Ref, computed } from '@nuxtjs/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '../utils';
export interface UseProductFactoryParams<
PRODUCTS,
PRODUCT_SEARCH_PARAMS extends ProductsSearchParams,
API extends PlatformApi = any
> extends FactoryParams<API> {
  productsSearch: (context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useProductFactory<PRODUCTS, PRODUCT_SEARCH_PARAMS, API extends PlatformApi = any>(
  factoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS, API>
) {
  return function useProduct(id: string): UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS, API> {
    const products: Ref<PRODUCTS> = sharedRef([], `useProduct-products-${id}`);
    const loading = sharedRef(false, `useProduct-loading-${id}`);
    const error: Ref<UseProductErrors> = sharedRef({
      search: null
    }, `useProduct-error-${id}`);

    const _factoryParams = configureFactoryParams(
      factoryParams,
      { mainRef: products, alias: 'currentProducts', loading, error }
    );

    const search = async (searchParams) => {
      Logger.debug(`useProduct/${id}/search`, searchParams);

      try {
        loading.value = true;
        products.value = await _factoryParams.productsSearch(searchParams);
        error.value.search = null;
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

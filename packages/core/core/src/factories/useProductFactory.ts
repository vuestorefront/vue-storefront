import { CustomQuery, ProductsSearchParams, UseProduct, Context, FactoryParams, ComposableErrors } from '../types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, generateContext } from '../utils';
export interface UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS extends ProductsSearchParams> extends FactoryParams {
  productsSearch: (context: Context, params: PRODUCT_SEARCH_PARAMS & { customQuery?: CustomQuery }) => Promise<PRODUCTS>;
}

export function useProductFactory<PRODUCTS, PRODUCT_SEARCH_PARAMS>(
  factoryParams: UseProductFactoryParams<PRODUCTS, PRODUCT_SEARCH_PARAMS>
) {
  return function useProduct(id: string): UseProduct<PRODUCTS, PRODUCT_SEARCH_PARAMS> {
    const products: Ref<PRODUCTS> = sharedRef([], `useProduct-products-${id}`);
    const loading = sharedRef(false, `useProduct-loading-${id}`);
    const context = generateContext(factoryParams);
    const error: Ref<ComposableErrors> = sharedRef({}, `useProduct-error-${id}`);

    const search = async (searchParams) => {
      Logger.debug('useProduct.search', searchParams);

      try {
        loading.value = true;
        error.value.search = null;
        products.value = await factoryParams.productsSearch(context, searchParams);
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

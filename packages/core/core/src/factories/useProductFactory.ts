import { CustomQuery, ProductsSearchParams, UseProduct, Context, FactoryParams } from '../types';
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

    const search = async (searchParams) => {
      Logger.debug('useProduct.search', searchParams);

      loading.value = true;
      try {
        products.value = await factoryParams.productsSearch(context, searchParams);
      } catch (e) {
        Logger.error('useProduct.search', e);
        throw e;
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      products: computed(() => products.value),
      loading: computed(() => loading.value)
    };
  };
}

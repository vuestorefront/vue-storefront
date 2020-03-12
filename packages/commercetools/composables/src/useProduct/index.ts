import { UseProduct } from '@vue-storefront/interfaces';
// import { usePersistedState } from '@vue-storefront/utils';
import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';
import { useProductFactory } from '@vue-storefront/factories';

const loadProductVariants = async (params): Promise<ProductVariant[]> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);

  return (enhancedProductResponse.data as any)._variants;
};

const useProduct: (
  cacheId: string
) => UseProduct<ProductVariant> = useProductFactory<ProductVariant, any>({
  productsSearch: loadProductVariants
});

export default useProduct;

// export default function useProduct(id: string): UseProduct<ProductVariant> {
//   console.info('SSR Temporarly disbled for product composable https://github.com/DivanteLtd/next/issues/232', id);
//   // const { state, persistedResource } = usePersistedState(id);

//   // const products: Ref<ProductVariant[]> = ref(state || []);
//   const products: Ref<ProductVariant[]> = ref([]);
//   const loading = products.value.length ? ref(false) : ref(true);
//   const totalProducts = ref(0);

//   const search = async (params) => {
//     loading.value = true;
//     // products.value = await persistedResource<ProductVariant[]>(loadProductVariants, params);
//     products.value = await loadProductVariants(params);
//     loading.value = false;
//   };

//   return {
//     products: computed(() => products.value),
//     search,
//     loading: computed(() => loading.value),
//     totalProducts: computed(() => totalProducts.value)
//   };
// }

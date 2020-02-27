import { UseProduct } from '@vue-storefront/interfaces';
import { ref, Ref, computed } from '@vue/composition-api';
import { getProduct } from '@vue-storefront/commercetools-api';
import { enhanceProduct } from './../helpers/internals';
import { ProductVariant } from './../types/GraphQL';

const loadProductVariants = async (params): Promise<ProductVariant[]> => {
  const productResponse = await getProduct(params);
  const enhancedProductResponse = enhanceProduct(productResponse);

  return (enhancedProductResponse.data as any)._variants;
};

export default function useProduct(): UseProduct<ProductVariant> {
  const products: Ref<ProductVariant[]> = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const search = async (params) => {
    loading.value = true;
    products.value = await loadProductVariants(params);
    loading.value = false;
  };

  return {
    products: computed(() => products.value),
    search,
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
}

import { UseProduct } from '@vue-storefront/interfaces'
import { ref, Ref } from '@vue/composition-api'
import { getProduct } from '@vue-storefront/commercetools-api'
import { enhanceProduct } from './../helpers/internals'
import { ProductVariant } from './../types/GraphQL'

interface UseProductSearchParams {
  slug?: string
  catIds?: string[]
  skus?: string[]
}

type Search = (params: UseProductSearchParams) => void

const loadProductVariants = async (params: UseProductSearchParams): Promise<ProductVariant[]> => {
  const productResponse = await getProduct(params)
  const enhancedProductResponse = enhanceProduct(productResponse)

  return (enhancedProductResponse.data as any)._variants
}

export default function useProduct(): UseProduct<ProductVariant, Search> {
  const products: Ref<ProductVariant[]> = ref([])
  const loading = ref(false)
  const error = ref(null)

  const search = async (params: UseProductSearchParams) => {
    products.value = await loadProductVariants(params)
  }

  return {
    products,
    search,
    loading,
    error
  }
}

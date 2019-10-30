import { ref, Ref, watch } from '@vue/composition-api'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { getProducts } from '@vue-storefront/api-client'
import { UseSearch } from './types'

/**
 * Hook fetches products
 * @returns products - array that contains pure fetched products
 * @returns search - function that fetches products by given criteria
 * @returns loading - field that informs you whether `search` finishes loading the data
 */
const useSearch = (): UseSearch => {
  const searchParams: Ref<{ skus: string[] }> = ref({ skus: [] })
  const loading: Ref<boolean> = ref(false)
  const products: Ref<ProductResponse[]> = ref([])

  watch(async () => {
    products.value = await getProducts({ skus: searchParams.value.skus })
    loading.value = false
  })

  const search = (skus: string[]) => {
    loading.value = true
    searchParams.value.skus = skus
  }

  return {
    products,
    loading,
    search
  }
}

export default useSearch

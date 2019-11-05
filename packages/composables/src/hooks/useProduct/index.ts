import { ref, Ref, watch  } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { getProducts } from '@vue-storefront/api-client'

type Product = Ref<ProductResponse[]>
type Search = (skus: string[]) => void

/**
 * Hook that returns specific product(s) data.
 * @returns products - array that contains pure fetched products
 * @returns search - function that fetches products by given criteria
 * @returns loading - field that informs you whether `search` finishes loading the data
 */
const useProduct = (): UseProduct<Product, Search> => {
  const searchParams: Ref<{ skus: string[] }> = ref({ skus: [] })
  const loading: Ref<boolean> = ref(false)
  const products: Ref<ProductResponse[]> = ref([])
  const error: Ref<any> = null

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
    search,
    error
  }
}

export default useProduct

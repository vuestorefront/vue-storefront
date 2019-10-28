import { ref, Ref, watch } from '@vue/composition-api'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { getProducts } from '@vue-storefront/api-client'

const useSearch = () => {
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

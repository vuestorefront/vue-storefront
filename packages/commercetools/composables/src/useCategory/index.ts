import { UseCategory } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'
import { getCategory, getProduct } from '@vue-storefront/commercetools-api'

interface UseCategorySearchParams {
  /** Category ID  */
  slug?: string
}

export default function useCategory (): UseCategory<any, any, any, any, any> {
  const categories = ref([])
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(true)
  const error = ref(null)

  const search = async (params: UseCategorySearchParams) => {
    const categoryResponse = await getCategory({ slug: params.slug })
    categories.value = categoryResponse.data.categories.results
    // const productResponse = await getProduct({ catId: categories.value.id })
    // const loadedProducts = productResponse.data.products.results
    loading.value = false
  }

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  }
}

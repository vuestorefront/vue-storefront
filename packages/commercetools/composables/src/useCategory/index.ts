import { UseCategory } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'
import { getProduct } from '@vue-storefront/commercetools-api'

interface UseCategorySearchParams {
  /** Category ID  */
  id?: string
}

export default function useCategory (): UseCategory<any, any, any, any, any> {
  const category = ref({})
  const appliedFilters = ref(null)
  const applyFilter = () => { () => { console.log('useCategory:applyFilter') } }
  const clearFilters = () => { () => { console.log('useCategory:clearFilters') } }
  const loading = ref(false)
  const error = ref(null)


  const search = async (params: UseCategorySearchParams) => {   
    await getProduct({ catId: params.id }).then(res => {
      category.value = res
    }) 
  }

  return {
    category,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  }
}

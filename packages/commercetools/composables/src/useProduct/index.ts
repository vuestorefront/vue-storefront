import { UseProduct } from '@vue-storefront/interfaces'
import { ref } from '@vue/composition-api'

export default function useProduct (): UseProduct<any, any> {
  const products = ref([])
  const search =  () => { console.log('search') }
  const loading = ref(false)
  const error = ref(null)

  return {
    products,
    search,
    loading,
    error
  }
}
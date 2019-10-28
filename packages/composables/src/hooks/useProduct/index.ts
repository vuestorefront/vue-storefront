import { Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import useSearch from './useSearch'
import useConfiguration from './useConfiguration'

type Product = Ref<ProductResponse[]>
type Search = (skus: string[]) => void

/**
 * Hook that returns specific product(s) data.
 * @param sku product sku
 * @returns product - whole product with all configurations
 * @returns currentcConfiguration - currently selected configuration (via `configure`)
 * @returns configure - function that modfies `currentConfiguration` object with currently selected product configuration
 */
const useProduct = (): UseProduct<Product, Search> => {
  const { products, search, loading } = useSearch()
  const { configure, currentConfigurations } = useConfiguration(products)

  return {
    products,
    currentConfigurations,
    configure,
    search,
    loading,
    error: null
  }
}

export default useProduct

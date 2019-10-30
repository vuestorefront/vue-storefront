import { Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import useSearch from './useSearch'
import useConfiguration from './useConfiguration'

type Product = Ref<ProductResponse[]>
type Search = (skus: string[]) => void

/**
 * Hook that returns specific product(s) data.
 * @returns products - array that contains pure fetched products
 * @returns variants - object of currently selected variants with metadata (via `configure`)
 * @returns configure - function that modfies `variants` object, setting new variant by given configuration
 * @returns search - function that fetches products by given criteria
 * @returns loading - field that informs you whether `search` finishes loading the data
 */
const useProduct = (): UseProduct<Product, Search> => {
  const { products, search, loading } = useSearch()
  const { configure, variants } = useConfiguration(products)

  return {
    products,
    variants,
    configure,
    search,
    loading,
    error: null,
  }
}

export default useProduct

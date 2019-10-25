import { ref, Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { getProducts } from '@vue-storefront/api-client'

type Product = any
type Search = () => void


/**
 * Hook that returns specific product(s) data.
 * @param sku product sku
 * @returns product - whole product with all configurations
 * @returns currentcConfiguration - currently selected configuration (via `configure`)
 * @returns configure - function that modfies `currentConfiguration` object with currently selected product configuration
 */

const useProduct = (sku: string): UseProduct<Product, Search> => {
  const products = ref(['product'])
  const currentConfiguration = ref('configurationFromHook' + sku)

  // getProducts({ skus: [sku] }).then(response => {
  //   products.value[0] = response[0] as any
  // })

  const configure = () => {
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  const search = () => {
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  return {
    products,
    search,
    loading: true,
    error: null
  }
}

export { useProduct }

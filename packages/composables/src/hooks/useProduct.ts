import { ref, Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { getProducts } from '@vue-storefront/api-client'

type Product = Ref<any>
type Configuration = Ref<string>
type Configure = () => void
type Search = () => void


/**
 * Hook that returns specific product(s) data.
 * @param sku product sku
 * @returns product - whole product with all configurations
 * @returns currentcConfiguration - currently selected configuration (via `configure`)
 * @returns configure - function that modfies `currentConfiguration` object with currently selected product configuration
 */

const useProduct = (sku: string): UseProduct<Product, Search, Configuration, Configure> => {
  const product = ref(null)
  const currentConfiguration = ref('configurationFromHook' + sku)

  getProducts({ skus: [sku] }).then(response => {
    product.value = response[0] as any
  })

  const configure = () => {
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  const search = () => {
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  return {
    product,
    currentConfiguration,
    configure,
    search,
    loading: true,
    error: null
  }
}

export { useProduct }

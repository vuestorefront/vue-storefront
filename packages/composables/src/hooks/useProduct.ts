import { ref, Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'

type Product = Ref<string>
type Configuration = Ref<string>
type Configure = () => void

/**
 * Hook that returns specific product(s) data.
 * @param sku product sku
 * @returns product - whole product with all configurations
 * @returns currentcConfiguration - currently selected configuration (via `configure`)
 * @returns configure - function that modfies `currentConfiguration` object with currently selected product configuration
 */
export function useProduct (sku: string): UseProduct<Product, Configuration, Configure> {
  const product = ref('productFromHook' + sku)
  const currentConfiguration = ref('configurationFromHook' + sku)

  const configure = () => { 
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  return {
    product,
    currentConfiguration,
    configure
  }
}
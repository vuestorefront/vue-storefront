import { ref, Ref, onMounted } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { setup, getProducts, getCategories } from '@vue-storefront/api-client'

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
export function useProduct (options: { sku: string }): UseProduct<Product, Configuration, Configure> {
  const product = ref('productFromHook' + options.sku)
  const currentConfiguration = ref('configurationFromHook' + options.sku)

  onMounted(async () => {
    setup({
      baseURL: 'http://localhost:8080/apiv2/',
    })
    const categories = await getCategories({ onlyActive: true })
    const response = await getProducts({ skus: [options.sku] })
    product.value = response[0]
  })

  const configure = () => {
    currentConfiguration.value = 'updatedConfigurationFromHook' + sku
  }

  return {
    product,
    currentConfiguration,
    configure
  }
}

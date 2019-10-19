import { ref, Ref, onMounted } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { setup, getProducts } from '@vue-storefront/api-client'

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

  onMounted(async () => {
    setup({
      baseURL: 'http://localhost:8080/apiv2/',
    });

    const response = await getProducts({ skus: [sku] });
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

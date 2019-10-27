import { ref, Ref, watch } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'
import { getProducts } from '@vue-storefront/api-client'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { readPossibleOptions, getAttributeNameById, createProductConfiguration } from './../../helpers/product'
import { ProductOption, ProductConfiguration, ProductConfigurationItem } from './../../types/Product'

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
  const searchParams: Ref<{ skus: string[] }> = ref({ skus: [] })
  const loading: Ref<boolean> = ref(false)
  const products: Ref<ProductResponse[]> = ref([])
  const currentConfigurations: Ref<any> = ref({})
  const lastConfiguration: Ref<any> = ref(null)

  watch(async () => {
    products.value = await getProducts({ skus: searchParams.value.skus })
  })

  const getPossibleOptions = (sku: string): ProductOption[] => {
    return readPossibleOptions(products.value.find(p => p.sku === sku))
  }

  const configure = (sku: string, configuration: ProductConfiguration) => {
    const product = products.value.find(p => p.sku === sku)

    if (!currentConfigurations.value[sku]) {
      currentConfigurations.value[sku] = []
    }

    const item = createProductConfiguration(product, configuration)

    currentConfigurations.value[sku].push(item)
    lastConfiguration.value = item
  }

  const search = (skus: string[]) => {
    searchParams.value.skus = skus
  }

  return {
    products,
    currentConfigurations,
    lastConfiguration,
    getPossibleOptions,
    configure,
    search,
    loading,
    error: null
  }
}

export default useProduct

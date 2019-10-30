import Vue from 'vue'
import { ref, Ref, watch, } from '@vue/composition-api'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { ProductConfiguration, UseConfiguration, ProductVariant } from './types'
import { createProductVariant, getFirstConfiguration } from './_helpers'

/**
 * Hook configures given products
 * @param products - array that contains pure fetched products
 * @returns configure - function that modfies `variants` object, setting new variant by given configuration
 * @returns variants - object of currently selected variants with metadata (via `configure`)
 */
const useConfiguration = (products: Ref<ProductResponse[]>): UseConfiguration => {
  const variants: Ref<{ [sku: string]: ProductVariant }> = ref({})

  const configure = (sku: string, configuration: ProductConfiguration) => {
    const product = products.value.find(p => p.sku === sku)
    const item = createProductVariant(product, configuration)

    Vue.delete(variants.value, sku)
    Vue.set(variants.value, sku, item)
  }

  watch(products, () => {
    if (products.value.length > 0) {
      products.value.forEach((product) =>
        configure(product.sku, getFirstConfiguration(product))
      )
    }
  })

  return {
    configure,
    variants,
  }
}

export default useConfiguration

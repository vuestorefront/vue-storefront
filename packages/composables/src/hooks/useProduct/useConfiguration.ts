import { ref, Ref, watch } from '@vue/composition-api'
import { ProductResponse } from '@vue-storefront/api-client/lib/types/Product'
import { ProductConfiguration } from './../../types/Product'
import { createProductConfiguration, pickFirstConfiguration } from './../../helpers/product'

const useConfiguration = (products: Ref<ProductResponse[]>) => {
  const currentConfigurations: Ref<any> = ref({})

  const configure = (sku: string, configuration: ProductConfiguration) => {
    const product = products.value.find(p => p.sku === sku)

    if (!currentConfigurations.value[sku]) {
      currentConfigurations.value[sku] = []
    }

    const item = createProductConfiguration(product, configuration)

    currentConfigurations.value[sku].push(item)
  }

  watch(products, () => {
    if (products.value.length > 0) {
      products.value.forEach((product) =>
        configure(product.sku, pickFirstConfiguration(product))
      )
    }
  })

  return {
    configure,
    currentConfigurations,
  }
}

export default useConfiguration;

import { ref, Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'

type Product = Ref<string>
type Configuration = Ref<string>
type Configure = () => void

export function useProduct (): UseProduct<Product, Configuration, Configure> {
  const product = ref('productFromHook')
  const configuration = ref('configurationFromHook')

  const configure = () => { 
    configuration.value = 'updatedConfigurationFromHook' 
  }

  return {
    product,
    configuration,
    configure
  }
}
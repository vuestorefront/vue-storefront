import { ref, Ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'

type Product = Ref<string>
type Configuration = Ref<string>
type Configure = () => void

export function useProduct (): UseProduct<Product, Configuration, Configure> {
  const product = ref('productFromHook')
  const currentConfiguration = ref('configurationFromHook')

  const configure = () => { 
    currentConfiguration.value = 'updatedConfigurationFromHook' 
  }

  return {
    product,
    currentConfiguration,
    configure
  }
}
import { ref } from '@vue/composition-api'
import { UseProduct } from '@vue-storefront/core'

export function useProduct (): UseProduct<string, string, () => void> {
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
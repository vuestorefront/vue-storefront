import { useProduct } from './hooks/useProduct'
import { Connector } from '@vue-storefront/core'

/**
 * Default Vue Storefront 2 connector for Magento 1/2 and integrated platforms from Vue Storefront 1
 */
const DefaultConnector: Connector<(config: any) => any> = {
  name: 'Default Vue Storefront  Connector',
  platform: 'Magento 1/2 + Vue Storefront 1 integrations',
  rawEntrys: [
    { package: '@vue-storefront/composables', path: 'raw.ts' },
    { package: '@vue-storefront/api-client', path: 'src/index.ts' }
  ],
  setup: function (config: any) {
    console.log('setting up')
  }
}

export {
  useProduct,
  DefaultConnector
}
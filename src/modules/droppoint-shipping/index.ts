import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { module } from './store'

export const KEY = 'droppoint-shipping'
const moduleConfig: VueStorefrontModuleConfig = {
    key: KEY,
    store: { module: module },
}

export const DroppointShipping = new VueStorefrontModule(moduleConfig)

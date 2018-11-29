import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { module } from './store'

export const KEY = 'droppoint-shipping'
const moduleConfig: VueStorefrontModuleConfig = {
    key: KEY,
    store: { modules: [{ key: KEY, module }] },
}

export const DroppointShipping = new VueStorefrontModule(moduleConfig)

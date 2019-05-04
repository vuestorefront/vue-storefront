import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'

const KEY = 'instant-checkout'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY
}

export const InstantCheckout = new VueStorefrontModule(moduleConfig)
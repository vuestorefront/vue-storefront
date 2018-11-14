import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'

import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'checkout'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'checkout', module: checkoutModule },
    { key: 'payment', module: paymentModule },
  ] },
}

export const Checkout = new VueStorefrontModule(moduleConfig)

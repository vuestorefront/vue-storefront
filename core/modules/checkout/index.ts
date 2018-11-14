import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'
import { shippingModule } from './store/shipping'

import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'

export const KEY = 'checkout'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store: { modules: [
    { key: 'payment', module: paymentModule },
    { key: 'shipping', module: shippingModule },
    { key: 'checkout', module: checkoutModule },
  ] },
}

export const Checkout = new VueStorefrontModule(moduleConfig)

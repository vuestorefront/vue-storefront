import { checkoutModule } from './store/checkout'
import { paymentModule } from './store/payment'
import { shippingModule } from './store/shipping'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { createModule } from '@vue-storefront/core/lib/module'

export const KEY = 'checkout'
export const Checkout = createModule({
  key: KEY,
  store: { modules: [
    { key: 'shipping', module: shippingModule },
    { key: 'payment', module: paymentModule },
    { key: 'checkout', module: checkoutModule }
  ] },
  beforeRegistration,
  afterRegistration
})

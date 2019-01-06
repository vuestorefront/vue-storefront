import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'

const KEY = 'payment-cash-on-delivery'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration
}

export const PaymentCashOnDelivery = new VueStorefrontModule(moduleConfig)
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { AMAZON_SESSION_ID } from './types/getters';
import { CLEAR_AMAZON_SESSION_ID } from './types/mutations';
import { MODULE_NAME } from './types/module-name';
import { AmazonPayModule } from './store';
import { SupportedMethodCodes } from './types/supported-method-codes';

import PaymentAmazonPay from './components/payment-amazon-pay.vue';

const AMAZON_SCRIPT = '<script async src="https://static-na.payments-amazon.com/checkout.js"></script>';

export const AmazonPay: StorefrontModule = function ({ app, store }) {
  store.registerModule(MODULE_NAME, AmazonPayModule);

  app.$extendedHead.append(AMAZON_SCRIPT);
};

const AMAZON_SESSION_ID_GETTER = `${MODULE_NAME}/${AMAZON_SESSION_ID}`;
const CLEAR_AMAZON_SESSION_ID_MUTATION = `${MODULE_NAME}/${CLEAR_AMAZON_SESSION_ID}`;

export {
  AMAZON_SESSION_ID_GETTER,
  CLEAR_AMAZON_SESSION_ID_MUTATION,
  SupportedMethodCodes,
  PaymentAmazonPay
}

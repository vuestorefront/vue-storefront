import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

import { PAYMENT_NONCE } from './types/getters';
import { CLEAR_PAYMENT_NONCE } from './types/mutations';
import { MODULE_NAME } from './types/module-name';
import { AmazonPayModule } from './store';
import { SupportedMethodCodes } from './types/supported-method-codes';

import PaymentAmazonPay from './components/payment-amazon-pay.vue';

const AMAZON_SCRIPT = '<script async src="https://static-na.payments-amazon.com/checkout.js"></script>';

export const AmazonPay: StorefrontModule = function ({ app, store }) {
  store.registerModule(MODULE_NAME, AmazonPayModule);

  app.$extendedHead.append(AMAZON_SCRIPT);

  if (app.$isServer) {
    return;
  }

  const onCollectSupportedPaymentMethodsEventHandler = (methods: string[]) => {
    methods.push(SupportedMethodCodes.AMAZON_PAY);
  };

  EventBus.$on(
    'collect-methods-handled-by-other-modules',
    onCollectSupportedPaymentMethodsEventHandler
  );
};

const PAYMENT_NONCE_GETTER = `${MODULE_NAME}/${PAYMENT_NONCE}`;
const CLEAR_PAYMENT_NONCE_MUTATION = `${MODULE_NAME}/${CLEAR_PAYMENT_NONCE}`;

export {
  PAYMENT_NONCE_GETTER,
  CLEAR_PAYMENT_NONCE_MUTATION,
  SupportedMethodCodes,
  PaymentAmazonPay
}

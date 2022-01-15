import { coreHooks } from '@vue-storefront/core/hooks';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { Order } from '@vue-storefront/core/modules/order/types/Order';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

import { module } from './store';
import { SET_CHECKOUT_TOKEN } from './types/StoreMutations';
import { AFFIRM_METHOD_CODE } from './types/AffirmPaymentMethod';

export const PaymentAffirm: StorefrontModule = function ({ app, store }) {
  store.registerModule('affirm', module);

  coreHooks.afterAppInit(() => {
    store.dispatch('affirm/checkIsPaymentMethodAvailable');

    if (!app.$isServer) {
      let isCurrentPaymentMethod = false;
      store.watch((state) => state.checkout.paymentDetails, (_, newMethodCode) => {
        isCurrentPaymentMethod = newMethodCode.paymentMethod === AFFIRM_METHOD_CODE;
      });

      const invokePlaceOrder = async () => {
        if (!isCurrentPaymentMethod) {
          return;
        }

        const checkoutObject = await store.dispatch('affirm/getCheckoutObject');

        if (!checkoutObject) {
          return; // TODO throw error?
        }

        (window as any).affirm.checkout(checkoutObject);
        (window as any).affirm.checkout.open({
          onSuccess: (event) => {
            store.commit(`affirm/${SET_CHECKOUT_TOKEN}`, event.checkout_token);
            EventBus.$emit('checkout-do-placeOrder', {});
          }
        });
      }

      const orderBeforePlacedHandler = (order: Order) => {
        const checkoutToken = store.getters['affirm/getCheckoutToken'];
        if (!isCurrentPaymentMethod || !checkoutToken) {
          return;
        }

        order.checkout_token = checkoutToken;
      }

      const onCountryUpdateHandler = async () => {
        await store.dispatch('affirm/checkIsPaymentMethodAvailable')
      }

      EventBus.$on('checkout-before-placeOrder', invokePlaceOrder);
      EventBus.$on('order-before-placed', orderBeforePlacedHandler);
      EventBus.$on('checkout-before-shippingMethods', onCountryUpdateHandler);
      EventBus.$on('checkout-payment-country-changed', onCountryUpdateHandler);
    }
  })
}

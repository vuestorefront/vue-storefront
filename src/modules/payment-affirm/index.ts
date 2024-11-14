import { coreHooks } from '@vue-storefront/core/hooks';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { Order } from '@vue-storefront/core/modules/order/types/Order';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import PaymentMethod from 'core/modules/cart/types/PaymentMethod';

import registerStoryblokComponents from './components/storyblok'
import addAffirmScript from './helpers/add-affirm-script.function';
import { module } from './store';
import { SET_CHECKOUT_TOKEN } from './types/StoreMutations';
import { AFFIRM_METHOD_CODE, MAGENTO1_AFFIRM_METHOD_CODE } from './types/AffirmPaymentMethod';
import { AFFIRM_MODAL_CLOSED } from './types/AffirmCheckoutEvents';
import affirmIcon from './assets/affirm-icon.svg';
import { PAYMENT_ERROR_EVENT } from '../shared';

export const PaymentAffirm: StorefrontModule = function ({ app, store, appConfig }) {
  store.registerModule('affirm', module);

  registerStoryblokComponents();

  coreHooks.afterAppInit(() => {
    if (!app.$isServer) {
      addAffirmScript(appConfig);

      let isCurrentPaymentMethod = false;
      EventBus.$on('checkout-payment-method-changed', (paymentMethodCode: string) => {
        isCurrentPaymentMethod = paymentMethodCode === AFFIRM_METHOD_CODE || paymentMethodCode === MAGENTO1_AFFIRM_METHOD_CODE;
      })

      const invokePlaceOrder = async () => {
        if (!isCurrentPaymentMethod) {
          return;
        }

        let checkoutObject;

        try {
          checkoutObject = await store.dispatch('affirm/getCheckoutObject');
        } catch (_) {
          checkoutObject = undefined;
        }

        if (!checkoutObject) {
          EventBus.$emit(PAYMENT_ERROR_EVENT);
          return;
        }

        const affirm = (window as any).affirm;

        affirm.ui.ready(
          () => {
            affirm.ui.error.on('close', () => {
              EventBus.$emit(AFFIRM_MODAL_CLOSED);
            });
          }
        );

        affirm.checkout(checkoutObject);
        affirm.checkout.open({
          onSuccess: (event) => {
            store.commit(`affirm/${SET_CHECKOUT_TOKEN}`, event.checkout_token);
            EventBus.$emit('checkout-do-placeOrder', {});
          },
          onFail: () => {
            EventBus.$emit(AFFIRM_MODAL_CLOSED);
          }
        });
      }

      const orderBeforePlacedHandler = ({ order }: {order: Order}) => {
        if (!isCurrentPaymentMethod) {
          return;
        }

        const checkoutToken = store.getters['affirm/getCheckoutToken'];

        if (!checkoutToken) {
          EventBus.$emit(PAYMENT_ERROR_EVENT);
          return;
        }

        order.checkout_token = checkoutToken; // Magento 1 checkout token send workaround
        order.addressInformation.payment_method_additional.checkout_token = checkoutToken; // Magento 2 checkout token send workaround
      }

      const onCollectSupportedPaymentMethodsEventHandler = (methods: string[]) => {
        methods.push(AFFIRM_METHOD_CODE);
        methods.push(MAGENTO1_AFFIRM_METHOD_CODE);
      };

      const onBeforeReplacePaymentMethods = (methods: PaymentMethod[]) => {
        methods.forEach((method) => {
          if (method.code !== AFFIRM_METHOD_CODE && method.code !== MAGENTO1_AFFIRM_METHOD_CODE) {
            return;
          }

          method.hint = app.$t('Affirm page will opened in the separate window to securely complete your purchase. Just fill out a few pieces of basic information and get a real-time decision. Checking your eligibility won\'t affect your credit score.').toString();
          method.icon = affirmIcon;
        })
      };

      EventBus.$on('checkout-before-placeOrder', invokePlaceOrder);
      EventBus.$on('order-before-placed', orderBeforePlacedHandler);
      EventBus.$on(
        'collect-methods-handled-by-other-modules',
        onCollectSupportedPaymentMethodsEventHandler
      );
      EventBus.$on('before-replace-payment-methods', onBeforeReplacePaymentMethods);
    }
  })
}

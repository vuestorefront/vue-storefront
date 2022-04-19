import { coreHooks } from '@vue-storefront/core/hooks';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { Order } from '@vue-storefront/core/modules/order/types/Order';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import registerStoryblokComponents from './components/storyblok'
import addAffirmScript from './helpers/add-affirm-script.function';

import { module } from './store';
import { SET_CHECKOUT_TOKEN } from './types/StoreMutations';
import { AFFIRM_METHOD_CODE } from './types/AffirmPaymentMethod';
import { AFFIRM_BEFORE_PLACE_ORDER, AFFIRM_MODAL_CLOSED, AFFIRM_CHECKOUT_ERROR } from './types/AffirmCheckoutEvents';
import PaymentMethod from 'core/modules/cart/types/PaymentMethod';

export const PaymentAffirm: StorefrontModule = function ({ app, store, appConfig }) {
  store.registerModule('affirm', module);

  registerStoryblokComponents();

  coreHooks.afterAppInit(() => {
    if (!app.$isServer) {
      addAffirmScript(appConfig);

      let isCurrentPaymentMethod = false;
      EventBus.$on('checkout-payment-method-changed', (paymentMethodCode: string) => {
        isCurrentPaymentMethod = paymentMethodCode === AFFIRM_METHOD_CODE;
      })

      const invokePlaceOrder = async () => {
        if (!isCurrentPaymentMethod) {
          return;
        }

        EventBus.$emit(AFFIRM_BEFORE_PLACE_ORDER);

        const checkoutObject = await store.dispatch('affirm/getCheckoutObject');

        if (!checkoutObject) {
          EventBus.$emit(AFFIRM_CHECKOUT_ERROR);
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
            EventBus.$emit(AFFIRM_MODAL_CLOSED);
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
          EventBus.$emit(AFFIRM_CHECKOUT_ERROR);
          return;
        }

        order.checkout_token = checkoutToken;
      }

      const onCollectSupportedPaymentMethodsEventHandler = (methods: string[]) => {
        methods.push(AFFIRM_METHOD_CODE);
      };

      const onBeforeReplacePaymentMethods = (methods: PaymentMethod[]) => {
        methods.forEach((method) => {
          if (method.code !== AFFIRM_METHOD_CODE) {
            return;
          }

          method.hint = app.$t('Affirm page will opened in the separate window to securely complete your purchase. Just fill out a few pieces of basic information and get a real-time decision. Checking your eligibility won\'t affect your credit score.').toString();
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

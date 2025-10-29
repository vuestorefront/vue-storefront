import { coreHooks } from '@vue-storefront/core/hooks';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import PaymentMethod from 'core/modules/cart/types/PaymentMethod';

import registerStoryblokComponents from './components/storyblok'
import addAffirmScript from './helpers/add-affirm-script.function';
import { AFFIRM_METHOD_CODE } from './types/AffirmPaymentMethod';
import { AFFIRM_MODAL_CLOSED } from './types/AffirmCheckoutEvents';
import affirmIcon from './assets/affirm-icon.svg';
import { PAYMENT_ERROR_EVENT } from '../shared';

export const PaymentAffirm: StorefrontModule = function ({ app, store, appConfig }) {
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
            EventBus.$emit('checkout-do-placeOrder', { checkout_token: event.checkout_token });
          },
          onFail: () => {
            EventBus.$emit(AFFIRM_MODAL_CLOSED);
          }
        });
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
          method.icon = affirmIcon;
        })
      };

      EventBus.$on('checkout-before-placeOrder', invokePlaceOrder);
      EventBus.$on(
        'collect-methods-handled-by-other-modules',
        onCollectSupportedPaymentMethodsEventHandler
      );
      EventBus.$on('before-replace-payment-methods', onBeforeReplacePaymentMethods);
    }
  })
}

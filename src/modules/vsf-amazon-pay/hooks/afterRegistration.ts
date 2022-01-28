import { KEY, METHOD_CODE } from '../index'
import * as types from '../store/mutation-types'
import * as states from '../store/order-states'
import i18n from '@vue-storefront/i18n'

export function afterRegistration ({ Vue, config, store, isServer }) {
  if (config.amazonPay) {
    // Update the methods
    store.subscribe((mutation) => {
      const type = mutation.type;

      if (type.endsWith(types.SET_ORDER_REFERENCE_ID)) {
        let methods = store.getters['checkout/getPaymentMethods'].filter(method => method.code === METHOD_CODE);

        if (methods.length) {
          store.dispatch('checkout/updatePaymentDetails', { paymentMethod: METHOD_CODE });

          return;
        }

        store.dispatch('checkout/addPaymentMethod', {
          'title': 'Amazon Pay',
          'code': METHOD_CODE,
          'cost': 0,
          'costInclTax': 0,
          'default': false,
          'offline': false,
          'is_server_method': false,
          'hidden': true
        });
        store.dispatch('checkout/updatePaymentDetails', { paymentMethod: METHOD_CODE });
      }

      if (type.endsWith(types.RESET_ORDER)) {
        let methods = store.getters['checkout/getPaymentMethods'];

        store.dispatch('checkout/replacePaymentMethods', methods.filter(method => method.code !== METHOD_CODE));
        store.dispatch('checkout/updatePaymentDetails', { paymentMethod: '' });
      }
    });

    if (!isServer) {
      let w = window as any

      w.onAmazonLoginReady = function () {
        w.amazon.Login.setClientId(config.amazonPay.clientId);
      }
      w.onAmazonPaymentsReady = () => {
        store.commit(KEY + '/' + types.SET_AMAZON_PAYMENTS_READY, true)
        Vue.prototype.$bus.$emit('amazon-payments-ready')
      }

      const amazonLogout = () => {
        w.amazon.Login.logout()
        store.dispatch(KEY + '/clearUserToken')
        store.commit(KEY + '/' + types.RESET)
      }

      Vue.prototype.$bus.$on('user-before-logout', amazonLogout)

      let jsUrl = `https://static-na.payments-amazon.com/OffAmazonPayments/us/${config.amazonPay.sandbox ? 'sandbox/' : ''}js/Widgets.js`
      let docHead = document.getElementsByTagName('head')[0]
      let docScript = document.createElement('script')

      docScript.type = 'text/javascript'
      docScript.async = true
      docScript.src = jsUrl
      docHead.appendChild(docScript)

      let correctPaymentMethod = false

      Vue.prototype.$bus.$on('checkout-payment-method-changed', (paymentMethodCode) => {
        if (paymentMethodCode === METHOD_CODE) {
          correctPaymentMethod = true
        } else {
          correctPaymentMethod = false
        }
      })

      const placeOrder = async () => {
        if (correctPaymentMethod) {
          try {
            if (store.state[KEY].orderState === states.NEW) {
              store.commit(KEY + '/' + types.SET_ORDER_STATE, states.DRAFT)
            }

            if (store.state[KEY].orderState === states.DRAFT) {
              let finalizeResponse = await store.dispatch(KEY + '/submitFinalOrderReference')

              if (finalizeResponse.result.Constraints) {
                let constraints = Array.isArray(finalizeResponse.result.Constraints)
                  ? finalizeResponse.result.Constraints
                  : [finalizeResponse.result.Constraints]

                for (let i = 0; i < constraints.length; i++) {
                  const constraint = constraints[i].Constraint

                  store.dispatch('notification/spawnNotification', {
                    type: 'error',
                    message: i18n.t(constraint.Description),
                    action1: { label: i18n.t('OK') }
                  })
                }

                Vue.prototype.$bus.$emit('amazon-order-constraints', constraints)

                return
              }
            }

            Vue.prototype.$bus.$emit('checkout-do-placeOrder', {
              amazon_order_reference_id: store.state[KEY].orderReferenceId,
              sandbox: config.amazonPay.sandbox
            })
          } catch (err) {
            if (err.hasOwnProperty('json')) {
              err.json().then(json => {
                console.error(json)
              }).catch(() => {
                console.error(err)
              })
            } else {
              console.error(err)
            }
          }
        }
      }

      Vue.prototype.$bus.$on('checkout-before-placeOrder', placeOrder)

      Vue.prototype.$bus.$on('order-after-placed', () => {
        store.commit(KEY + '/' + types.RESET_ORDER)
      })
    }
  }
}

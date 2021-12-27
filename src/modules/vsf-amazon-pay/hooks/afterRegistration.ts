import { KEY, METHOD_CODE } from '../index'
import * as types from '../store/mutation-types'
import * as states from '../store/order-states'

export function afterRegistration({ Vue, config, store, isServer }) {
  if (config.amazonPay) { 
    // Update the methods
    store.dispatch('payment/addMethod', {
      'title': 'Amazon Pay',
      'code': METHOD_CODE,
      'cost': 0,
      'costInclTax': 0,
      'default': false,
      'offline': false,
      'is_server_method': false,
      'hidden': true
    })

    if (!isServer) {
      let w = window as any

      w.onAmazonLoginReady = function() {
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

      let jsUrl = `https://static-na.payments-amazon.com/OffAmazonPayments/us/${ config.amazonPay.sandbox ? 'sandbox/' : '' }js/Widgets.js`
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
          if (store.state[KEY].orderState == states.NEW) {
            store.commit(KEY + '/' + types.SET_ORDER_STATE, states.DRAFT)
          }

          try {
            if (store.state[KEY].orderState == states.DRAFT) {
              let finalizeResponse = await store.dispatch(KEY + '/submitFinalOrderReference')

              if (finalizeResponse.result.Constraints) {
                let constraints = Array.isArray(finalizeResponse.result.Constraints) ?
                  finalizeResponse.result.Constraints :
                  [finalizeResponse.result.Constraints]

                Vue.prototype.$bus.$emit('amazon-order-constraints', constraints)
                return
              }
            }

            await store.dispatch(KEY + '/confirmOrderReference')
            store.commit(KEY + '/' + types.SET_ORDER_STATE, states.OPEN)

            let authorizeResponse = await store.dispatch(KEY + '/authorizeOrder')

            if (authorizeResponse.result.AuthorizationStatus.State === 'Declined') {
              if (authorizeResponse.result.AuthorizationStatus.ReasonCode === 'InvalidPaymentMethod') {
                store.commit(KEY + '/' + types.SET_ORDER_STATE, states.SUSPENDED)
                // Show Wallet Widget again
                Vue.prototype.$bus.$emit('amazon-invalid-payment-method')
                return
              } else {
                if (authorizeResponse.result.AuthorizationStatus.ReasonCode === 'TransactionTimedOut') {
                  if (config.amazonPay.authorization.asynchronous) {
                    // Asynchronous authorization
                    // Show Thank You Page Including a note that payment was not confirmed yet,
                    // in case of decline, an email-notification will be sent.
                    let AmazonAuthorizationId = authorizeResponse.result.AmazonAuthorizationId
                    Vue.prototype.$bus.$emit('checkout-do-placeOrder', {
                      AmazonAuthorizationId,
                      AuthorizationState: authorizeResponse.result.AuthorizationStatus.ReasonCode
                    })
                    Vue.prototype.$bus.$emit('amazon-authorization-asynchronous')
                    store.commit(KEY + '/' + types.RESET_ORDER)
                    return
                  }
                }

                // The following other potential ReasonCodes are handled equally:
                // - AmazonRejected
                // - Processin Failure
                // - TransactionTimedOut (for synchronous authorization)

                if (store.state[KEY].orderState == states.OPEN) {
                  store.dispatch(KEY + '/cancelOrderReference')
                }

                // 1. Logout from Amazon Pay
                // 2. Redirect buyer back to Cart Page
                // 3. Show info to buyer about failed payment

                amazonLogout()
                Vue.prototype.$bus.$emit('amazon-authorization-declined', authorizeResponse.result.AuthorizationStatus.ReasonCode)
                return
              }
            } else {
              let AmazonAuthorizationId = authorizeResponse.result.AmazonAuthorizationId
              Vue.prototype.$bus.$emit('checkout-do-placeOrder', {
                AmazonAuthorizationId,
                AuthorizationState: authorizeResponse.result.AuthorizationStatus.ReasonCode
              })
              store.commit(KEY + '/' + types.RESET_ORDER)
              return
            }
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
    }
  }
}

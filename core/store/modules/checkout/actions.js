import * as types from '../../mutation-types'
import rootStore from '../../'
const EventBus = rootStore.EventBus
const i18n = rootStore.i18n

export default {
  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  placeOrder (context, { order }) {
    try {
      context.dispatch('order/placeOrder', order, {root: true}).then(result => {
        context.dispatch('cart/clear', {}, {root: true})
        if (context.state.personalDetails.createAccount) {
          context.commit(types.CHECKOUT_DROP_PASSWORD)
        }
      })
    } catch (e) {
      if (e.name === 'ValidationError') {
        console.error('Internal validation error; Order entity is not compliant with the schema', e.messages)
        EventBus.$emit('notification', {
          type: 'error',
          message: i18n.t('Internal validation error. Please check if all required fields are filled in. Please contact us on contributors@vuestorefront.io'),
          action1: { label: 'OK', action: 'close' }
        })
      } else {
        console.error(e)
      }
    }
  },
  savePersonalDetails ({ commit }, personalDetails) {
    commit(types.CHECKOUT_SAVE_PERSONAL_DETAILS, personalDetails)
  },
  saveShippingDetails ({ commit }, shippingDetails) {
    commit(types.CHECKOUT_SAVE_SHIPPING_DETAILS, shippingDetails)
  },
  savePaymentDetails ({ commit }, paymentDetails) {
    commit(types.CHECKOUT_SAVE_PAYMENT_DETAILS, paymentDetails)
  },
  load ({ commit }) {
    global.db.checkoutFieldsCollection.getItem('personal-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_PERSONAL_DETAILS, details)
      }
    })
    global.db.checkoutFieldsCollection.getItem('shipping-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_SHIPPING_DETAILS, details)
      }
    })
    global.db.checkoutFieldsCollection.getItem('payment-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_PAYMENT_DETAILS, details)
      }
    })
  },
  updatePropValue ({ commit }, payload) {
    commit(types.CHECKOUT_UPDATE_PROP_VALUE, payload)
  }
}

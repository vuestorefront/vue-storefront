import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CheckoutState from '../../types/CheckoutState'
import { Logger } from '@vue-storefront/core/lib/logger'

const actions: ActionTree<CheckoutState, RootState> = {
  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  async placeOrder ({ state, commit, dispatch }, { order }) {
    try {
      const result = await dispatch('order/placeOrder', order, {root: true})
      if (!result.resultCode || result.resultCode === 200) {
        Vue.prototype.$db.usersCollection.setItem('last-cart-bypass-ts', new Date().getTime())
        await dispatch('cart/clear', { recreateAndSyncCart: true }, {root: true})
        if (state.personalDetails.createAccount) {
          commit(types.CHECKOUT_DROP_PASSWORD)
        }
      }
    } catch (e) {
      Logger.error(e, 'checkout')()
    }
  },
  setModifiedAt ({ commit }, timestamp) {
    commit(types.CHECKOUT_SET_MODIFIED_AT, timestamp)
  },
  savePersonalDetails ({ commit }, personalDetails) {
    // todo: create and move perdonal details vuex
    commit(types.CHECKOUT_SAVE_PERSONAL_DETAILS, personalDetails)
  },
  saveShippingDetails ({ commit }, shippingDetails) {
    // todo: move to shipping vuex
    commit(types.CHECKOUT_SAVE_SHIPPING_DETAILS, shippingDetails)
  },
  savePaymentDetails ({ commit }, paymentDetails) {
    // todo: move to payment vuex
    commit(types.CHECKOUT_SAVE_PAYMENT_DETAILS, paymentDetails)
  },
  load ({ commit }) {
    Vue.prototype.$db.checkoutFieldsCollection.getItem('personal-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_PERSONAL_DETAILS, details)
      }
    })
    Vue.prototype.$db.checkoutFieldsCollection.getItem('shipping-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_SHIPPING_DETAILS, details)
      }
    })
    Vue.prototype.$db.checkoutFieldsCollection.getItem('payment-details', (err, details) => {
      if (err) throw new Error(err)
      if (details) {
        commit(types.CHECKOUT_LOAD_PAYMENT_DETAILS, details)
      }
    })
  },
  updatePropValue ({ commit }, payload) {
    commit(types.CHECKOUT_UPDATE_PROP_VALUE, payload)
  },
  setThankYouPage ({ commit }, payload) {
    commit(types.CHECKOUT_SET_THANKYOU, payload)
  }
}

export default actions

import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CheckoutState from '../../types/CheckoutState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

const actions: ActionTree<CheckoutState, RootState> = {
  async placeOrder ({ dispatch }, { order }) {
    try {
      const result = await dispatch('order/placeOrder', order, { root: true })
      if (!result.resultCode || result.resultCode === 200) {
        await dispatch('saveBypassTs')
        await dispatch('cart/clear', { recreateAndSyncCart: true }, { root: true })
        dispatch('dropPassword')
      }
    } catch (e) {
      Logger.error(e, 'checkout')()
    }
  },
  async saveBypassTs () {
    const userStorage = StorageManager.get('user')
    await userStorage.setItem('last-cart-bypass-ts', new Date().getTime())
  },
  dropPassword ({ commit, state }) {
    if (state.personalDetails.createAccount) {
      commit(types.CHECKOUT_DROP_PASSWORD)
    }
  },
  setModifiedAt ({ commit }, timestamp) {
    commit(types.CHECKOUT_SET_MODIFIED_AT, timestamp)
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
  async load ({ commit }) {
    const checkoutStorage = StorageManager.get('checkout')
    const personalDetails = await checkoutStorage.getItem('personal-details')
    const shippingDetails = await checkoutStorage.getItem('shipping-details')
    const paymentDetails = await checkoutStorage.getItem('payment-details')

    if (personalDetails) {
      commit(types.CHECKOUT_LOAD_PERSONAL_DETAILS, personalDetails)
    }

    if (shippingDetails) {
      commit(types.CHECKOUT_LOAD_SHIPPING_DETAILS, shippingDetails)
    }

    if (paymentDetails) {
      commit(types.CHECKOUT_LOAD_PAYMENT_DETAILS, paymentDetails)
    }
  },
  updatePropValue ({ commit }, payload) {
    commit(types.CHECKOUT_UPDATE_PROP_VALUE, payload)
  },
  setThankYouPage ({ commit }, payload) {
    commit(types.CHECKOUT_SET_THANKYOU, payload)
  },
  addPaymentMethod ({ commit }, paymentMethod) {
    commit(types.CHECKOUT_ADD_PAYMENT_METHOD, paymentMethod)
  },
  replacePaymentMethods ({ commit }, paymentMethods) {
    commit(types.CHECKOUT_REPLACE_PAYMENT_METHODS, paymentMethods)
  },
  addShippingMethod ({ commit }, shippingMethod) {
    commit(types.CHECKOUT_ADD_SHIPPING_METHOD, shippingMethod)
  },
  replaceShippingMethods ({ commit }, shippingMethods) {
    commit(types.CHECKOUT_REPLACE_SHIPPING_METHODS, shippingMethods)
  }
}

export default actions

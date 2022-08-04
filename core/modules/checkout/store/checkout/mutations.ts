import { MutationTree } from 'vuex'

import * as types from './mutation-types'
import CheckoutState from '../../types/CheckoutState'
import getDefaultPersonalDetails from '../../helpers/default-personal-details.factory'
import getDefaultShippingDetails from '../../helpers/default-shipping-details.factory'
import getDefaultPaymentDetails from '../../helpers/default-payment-details.factory'

const mutations: MutationTree<CheckoutState> = {
  /**
   * Setup current order object
   * @param {Object} order Object
   */
  [types.CHECKOUT_PLACE_ORDER] (state, order) {
    state.order = order
  },
  [types.CHECKOUT_SET_MODIFIED_AT] (state, timestamp) {
    state.modifiedAt = timestamp
  },
  [types.CHECKOUT_SAVE_PERSONAL_DETAILS] (state, personalDetails) {
    state.personalDetails = personalDetails
  },
  [types.CHECKOUT_SAVE_SHIPPING_DETAILS] (state, shippingDetails) {
    state.shippingDetails = shippingDetails
  },
  [types.CHECKOUT_SAVE_PAYMENT_DETAILS] (state, paymentDetails) {
    state.paymentDetails = paymentDetails
  },
  [types.CHECKOUT_LOAD_PERSONAL_DETAILS] (state, storedPersonalDetails) {
    state.personalDetails = storedPersonalDetails
  },
  [types.CHECKOUT_LOAD_SHIPPING_DETAILS] (state, storedShippingDetails) {
    state.shippingDetails = storedShippingDetails
  },
  [types.CHECKOUT_LOAD_PAYMENT_DETAILS] (state, storedPaymentDetails) {
    state.paymentDetails = storedPaymentDetails
  },
  [types.CHECKOUT_RESET_PERSONAL_DETAILS] (state) {
    state.personalDetails = getDefaultPersonalDetails();
  },
  [types.CHECKOUT_RESET_SHIPPING_DETAILS] (state) {
    state.shippingDetails = getDefaultShippingDetails();
  },
  [types.CHECKOUT_RESET_PAYMENT_DETAILS] (state) {
    state.paymentDetails = getDefaultPaymentDetails();
  },
  [types.CHECKOUT_UPDATE_PROP_VALUE] (state, payload) {
    state.shippingDetails[payload[0]] = payload[1]
  },
  [types.CHECKOUT_DROP_PASSWORD] (state) {
    state.personalDetails.password = ''
    state.personalDetails.createAccount = false
  },
  [types.CHECKOUT_SET_THANKYOU] (state, payload) {
    state.isThankYouPage = payload
  },
  [types.CHECKOUT_ADD_PAYMENT_METHOD] (state, paymentMethod) {
    state.paymentMethods.push(paymentMethod)
  },
  [types.CHECKOUT_SET_PAYMENT_METHODS] (state, paymentMethods = []) {
    state.paymentMethods = paymentMethods
  },
  [types.CHECKOUT_ADD_SHIPPING_METHOD] (state, shippingMethods) {
    state.shippingMethods.push(shippingMethods)
  },
  [types.CHECKOUT_SET_SHIPPING_METHODS] (state, shippingMethods = []) {
    state.shippingMethods = shippingMethods
  },
  [types.CHECKOUT_UPDATE_PAYMENT_DETAILS] (state, updateData = {}) {
    state.paymentDetails = Object.assign({}, state.paymentDetails, updateData)
  }
}

export default mutations

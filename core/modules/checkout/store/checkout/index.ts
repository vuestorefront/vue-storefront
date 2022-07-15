import { Module } from 'vuex'

import RootState from '@vue-storefront/core/types/RootState'
import config from 'config'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import CheckoutState from '../../types/CheckoutState'
import getDefaultPersonalDetails from '../../helpers/default-personal-details.factory'
import getDefaultShippingDetails from '../../helpers/default-shipping-details.factory'
import getDefaultPaymentDetails from '../../helpers/default-payment-details.factory'

export const checkoutModule: Module<CheckoutState, RootState> = {
  namespaced: true,
  state: {
    order: {},
    paymentMethods: [],
    shippingMethods: config.shipping.methods,
    personalDetails: getDefaultPersonalDetails(),
    shippingDetails: getDefaultShippingDetails(),
    paymentDetails: getDefaultPaymentDetails(),
    isThankYouPage: false,
    modifiedAt: 0
  },
  getters,
  actions,
  mutations
}

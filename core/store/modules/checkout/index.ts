import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '../../types/RootState'
import CheckoutState from './types/CheckoutState'

const checkout: Module<CheckoutState, RootState> = {
  namespaced: true,
  state: {
    order: {},
    personalDetails: {
      firstName: '',
      lastName: '',
      emailAddress: '',
      password: '',
      createAccount: false
    },
    shippingDetails: {
      firstName: '',
      lastName: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      shippingMethod: ''
    },
    paymentDetails: {
      firstName: '',
      lastName: '',
      company: '',
      country: '',
      streetAddress: '',
      apartmentNumber: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNumber: '',
      taxId: '',
      paymentMethod: '',
      paymentMethodAdditional: {}
    },
    isThankYouPage: false
  },
  getters,
  actions,
  mutations
}

export default checkout

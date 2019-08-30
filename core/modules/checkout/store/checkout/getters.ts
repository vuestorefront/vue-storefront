import { GetterTree } from 'vuex'
import CheckoutState from '../../types/CheckoutState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CheckoutState, RootState> = {
  getShippingDetails: (state, getters, rootState) => {
    if (!state.shippingDetails.country) {
      return { ...state.shippingDetails, country: rootState.storeView.tax.defaultCountry }
    }

    return state.shippingDetails
  },
  getPersonalDetails: state => state.personalDetails,
  getPaymentDetails: state => state.paymentDetails,
  isThankYouPage: state => state.isThankYouPage,
  getModifiedAt: state => state.modifiedAt,
  isUserInCheckout: state => ((Date.now() - state.modifiedAt) <= (60 * 30 * 1000)),
  getPaymentMethods: (state, getters, rootState, rootGetters) => {
    const isVirtualCart = rootGetters['cart/isVirtualCart']

    return state.paymentMethods.filter(method => !isVirtualCart || method.code !== 'cashondelivery')
  },
  getDefaultPaymentMethod: (state, getters) => getters.getPaymentMethods.find(item => item.default),
  getNotServerPaymentMethods: (state, getters) =>
    getters.getPaymentMethods.filter((itm) =>
      (typeof itm !== 'object' || !itm.is_server_method)
    ),
  getShippingMethods: state => state.shippingMethods,
  getDefaultShippingMethod: state => state.shippingMethods.find(item => item.default)
}

export default getters

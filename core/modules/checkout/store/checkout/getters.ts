import { GetterTree } from 'vuex'
import CheckoutState from '../../types/CheckoutState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CheckoutState, RootState> = {
  getShippingDetails: state => state.shippingDetails,
  getPersonalDetails: state => state.personalDetails,
  getPaymentDetails: state => state.paymentDetails,
  isThankYouPage: state => state.isThankYouPage,
  getModifiedAt: state => state.modifiedAt,
  isUserInCheckout: state => ((Date.now() - state.modifiedAt) <= (60 * 30 * 1000)) // TODO: maybe refactor because it's timestamped for now; if user is in the checkout longer than 30min and will log in then the cart will be synced anyway
}

export default getters

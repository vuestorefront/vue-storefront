import { GetterTree } from 'vuex'
import CheckoutState from '../../types/CheckoutState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CheckoutState, RootState> = {
  isThankYouPage: state => state.isThankYouPage,
  getModifiedAt: state => state.modifiedAt,
  isUserInCheckout: state => ((Date.now() - state.modifiedAt) <= (60 * 5 * 1000)) // TODO: maybe refactor because it's timestamped for now
}

export default getters

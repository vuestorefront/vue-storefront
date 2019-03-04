import { GetterTree } from 'vuex'
import CheckoutState from '../../types/CheckoutState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<CheckoutState, RootState> = {
  isThankYouPage: state => state.isThankYouPage
}

export default getters

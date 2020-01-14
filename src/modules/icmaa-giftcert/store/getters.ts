import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import GiftcertState from '../types/GiftcertState'

const getters: GetterTree<GiftcertState, RootState> = {
  getGiftcertNumber: (state) => state.number,
  getGiftcertBalance: (state) => state.balance,
  getGiftcertExpires: (state) => state.expires,
  getGiftcertCurrency: (state) => state.currency
}

export default getters

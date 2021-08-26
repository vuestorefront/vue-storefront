import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<RootState, RootState> = {
  getCurrentStoreView: state => state.storeView
}

export default getters

import { GetterTree } from 'vuex'
import { UrlState } from '../types/UrlState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<UrlState, RootState> = {
  getLastMatchedRoute: state => state.lastMatchedRoute
}

export default getters

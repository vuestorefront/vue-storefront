import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import UserState from '../types/UserState'

const getters: GetterTree<UserState, RootState> = {
  isLoggedIn (state) {
    return state.current !== null
  }
}

export default getters

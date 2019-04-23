import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'

const getters: GetterTree<UserState, RootState> = {
  isLoggedIn (state) {
    return state.current !== null
  },
  isLocalSessionReaded:  state => state.local_session_readed,
  getUserToken (state) {
    return state.token
  }
}

export default getters

import { MutationTree } from 'vuex'
import UiStoreState from './types/UiStoreState'

const mutations: MutationTree<UiStoreState> = {
  setOverlay (state, action) {
    state.overlay = action === true
  },
  setLoader (state, action) {
    state.loader = action === true
  },
  setSidebar (state, action) {
    state.sidebar = action === true
  },
  setSearchpanel (state, action) {
    state.searchpanel = action === true
  },
  setAuthElem (state, action) {
    state.authElem = action
  },
  setWishlist (state, action) {
    state.wishlist = action === true
  },
  setOpenMyAccount (state, action) {
    state.openMyAccount = action === true
  }
}

export default mutations

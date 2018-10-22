import { Module } from 'vuex'
import mutations from './mutations'
import RootState from '../../types/RootState'
import UiStoreState from './types/UiStoreState'

const uiStore: Module<UiStoreState, RootState> = {
  namespaced: true,
  state: {
    sidebar: false,
    microcart: false,
    wishlist: false,
    searchpanel: false,
    newsletterPopup: false,
    overlay: false,
    loader: false,
    authElem: 'login',
    checkoutMode: false,
    openMyAccount: false
  },
  mutations
}

export default uiStore

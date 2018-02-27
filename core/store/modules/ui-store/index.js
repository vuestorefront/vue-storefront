import mutations from './mutations'

export default {
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

import { coreStore, extendStore } from 'lib/themes'

const mutations = {
  setCheckoutMode (state, action) {
    state.checkoutMode = action === true
  },
  setMicrocart (state, action) {
    state.microcart = action === true
    state.overlay = action === true
  },
  setSidebar (state, action) {
    state.sidebar = action === true
    state.overlay = action === true
  },
  setSearchpanel (state, action) {
    state.searchpanel = action === true
    state.overlay = action === true
  },
  setWishlist (state, action) {
    state.wishlist = action === true
    state.overlay = action === true
  },
  setSignUp (state, action) {
    state.signUp = action === true
    state.overlay = action === true
  },
  setNewsletterPopup (state, action) {
    state.newsletterPopup = action === true
    state.overlay = action === true
  }
}

export default extendStore(coreStore('modules/ui-store'), {
  mutations
})

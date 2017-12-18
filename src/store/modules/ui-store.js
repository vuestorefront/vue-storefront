const state = {
  sidebar: false,
  microcart: false,
  wishlist: false,
  searchpanel: false,
  newsletterPopup: false,
  overlay: false,
  signUp: false,
  authElem: 'login',
  checkoutMode: false
}

const mutations = {
  setOverlay (state, action) {
    state.overlay = action === true
  },
  setMicrocart (state, action) {
    state.microcart = action === true
  },
  setSidebar (state, action) {
    state.sidebar = action === true
  },
  setSearchpanel (state, action) {
    state.searchpanel = action === true
  },
  setSignUp (state, action) {
    state.signUp = action === true
    if (action === false) {
      state.authElem = 'login'
    }
  },
  setAuthElem (state, action) {
    state.authElem = action
  },
  setNewsletterPopup (state, action) {
    state.newsletterPopup = action === true
  },
  setWishlist (state, action) {
    state.wishlist = action === true
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

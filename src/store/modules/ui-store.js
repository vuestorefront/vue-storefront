const state = {
  sidebar: false,
  microcart: false,
  wishlist: false,
  searchpanel: false,
  overlay: false
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
  setWishlist (state, action) {
    state.wishlist = action === true
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

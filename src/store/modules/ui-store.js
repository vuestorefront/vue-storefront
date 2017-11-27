const state = {
  sidebar: false,
  microcart: false,
  searchpanel: false,
  overlay: false,
  signUp: false
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
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

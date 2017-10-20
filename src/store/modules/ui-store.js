export default {
  // TO-DO: Make ui-stores inheritance in themes from default ui-store like pages/components
  state: {
    sidebar: false,
    microcart: false,
    overlay: false
  },
  getters: {
    ui (state) {
      return {
        sidebar: state.sidebar,
        microcart: state.microcart,
        overlay: state.overlay
      }
    }
  },
  mutations: {
    setOverlay (state, action) {
      state.overlay = action === true
    },
    setMicrocart (state, action) {
      state.microcart = action === true
    },
    setSidebar (state, action) {
      state.sidebar = action === true
    }
  }
}

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // TO-DO: Use it instead of eventBus
  // TO-DO: Make ui-stores inheritance in themes from default ui-store like pages/components
  state: {
    sidebar: false,
    microcart: false,
    overlay: false
  },
  // COULD: actions for interface updates - do we need async updates?
  mutations: {
    setOverlay (state, action) {
      action === true ? state.overlay = true : state.overlay = false
    },
    setMicrocart (state, action) {
      action === true ? state.overlay = true : state.overlay = false
    },
    setSidebar (state, action) {
      action === true ? state.sidebar = true : state.sidebar = false
    }
  }
})

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
  mutations: {
    setOverlay (state, action) {
      action === true ? () => {
        state.overlay = true
      } : () => {
        state.overlay = true
      }
    },
    setMicrocart (state, action) {
      action === true ? () => {
        state.microcart = true
        state.overlay = true
      } : () => {
        state.microcart = false
        state.overlay = true
      }
    },
    setSidebar (state, action) {
      action === true ? () => {
        state.sidebar = true
        state.overlay = true
      } : () => {
        state.sidebar = false
        state.overlay = true
      }
    }
  }
})

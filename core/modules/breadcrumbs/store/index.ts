
export const module = {
  namespaced: true,
  state: {
    routes: [],
    current: null
  },
  mutations: {
    set (state, payload) {
      state.routes = payload.routes
      state.current = payload.current
    }
  },
  actions: {
    set ({ commit }, payload) {
      commit('set', payload)
    }
  }
}

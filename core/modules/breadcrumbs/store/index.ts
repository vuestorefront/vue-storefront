
export const breadcrumbsStore = {
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
  },
  getters: {
    getBreadcrumbsRoutes: (state) => state.routes,
    getBreadcrumbsCurrent: (state) => state.current
  }
}

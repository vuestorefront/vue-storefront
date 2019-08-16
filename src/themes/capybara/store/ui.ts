export const uiStore = {
  namespaced: true,
  state: {
    isCartSidebarOpen: false
  },
  mutations: {
    toggleCartSidebar (state, action) {
      state.isCartSidebarOpen = !state.isCartSidebarOpen
    }
  },
  actions: {
    toggleCartSidebar ({ commit }) {
      commit('toggleCartSidebar')
    }
  },
  getters: {
    isCartSidebarOpen: state => {
      return state.isCartSidebarOpen
    }
  }
}

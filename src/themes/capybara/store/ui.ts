export const uiStore = {
  namespaced: true,
  state: {
    isCartSidebarOpen: false,
    isWishlistSidebarOpen: false
  },
  mutations: {
    toggleCartSidebar (state, action) {
      state.isCartSidebarOpen = !state.isCartSidebarOpen
    },
    toggleWishlistSidebar (state, action) {
      state.isWishlistSidebarOpen = !state.isWishlistSidebarOpen
    }
  },
  actions: {
    toggleCartSidebar ({ commit }) {
      commit('toggleCartSidebar')
    },
    toggleWishlistSidebar ({ commit }) {
      commit('toggleWishlistSidebar')
    }
  },
  getters: {
    isCartSidebarOpen: state => {
      return state.isCartSidebarOpen
    },
    isWishlistSidebarOpen: state => {
      return state.isCartSidebarOpen
    }
  }
}

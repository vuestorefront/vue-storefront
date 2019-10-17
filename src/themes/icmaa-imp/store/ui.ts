import Vue from 'vue'

export const uiStore = {
  namespaced: true,
  state: {
    viewport: false,
    sidebarPath: [],
    sidebarAnimation: false,
    overlay: false,
    loader: false,
    authElem: 'login',
    checkoutMode: false,
    openMyAccount: false,
    /** Sidebar and popup type states: */
    sidebar: false,
    microcart: false,
    wishlist: false,
    searchpanel: false,
    addtocart: false,
    categoryfilter: false,
    newsletterPopup: false
  },
  mutations: {
    setViewport (state, viewport: string) {
      state.viewport = viewport
    },
    setCloseAll (state) {
      state.microcart = false
      state.sidebar = false
      state.searchpanel = false
      state.wishlist = false
      state.addtocart = false
      state.categoryfilter = false
      state.overlay = false
    },
    setCheckoutMode (state, action) {
      state.checkoutMode = action === true
    },
    toggleSidebar (state, property, action) {
      const status = action || !state[property]
      state.sidebarPath = []
      state[property] = status
      state.overlay = status
    },
    addSidebarPath (state, payload) {
      state.sidebarPath.push(payload)
    },
    removeSidebarPath (state) {
      state.sidebarAnimation = true
      setTimeout(() => {
        state.sidebarAnimation = false
        Vue.delete(state.sidebarPath, state.sidebarPath.length - 1)
      }, 500)
    },
    setOverlay (state, action) {
      state.overlay = action === true
    },
    setLoader (state, action) {
      state.loader = action === true
    },
    setAuthElem (state, action) {
      state.authElem = action
    }
  },
  actions: {
    setViewport ({ commit }, window) {
      /**
       * Breakpoints of TailwindCSS:
       * @see https://tailwindcss.com/docs/breakpoints/#app
       */
      const viewports = [ ['sm', 640], ['md', 768], ['lg', 1024], ['xl', 1280] ]
      const viewport = viewports.find(vp => window.innerWidth <= vp[1])

      if (viewport) {
        commit('setViewport', viewport[0])
      }
    },
    closeAll ({ commit }) {
      commit('setCloseAll')
    },
    setSidebar ({ commit, state }, status) {
      commit('toggleSidebar', 'sidebar', status)
    },
    setSearchpanel ({ commit, state }, status) {
      commit('toggleSidebar', 'searchpanel', status)
    },
    setMicrocart ({ commit, state }, status) {
      commit('toggleSidebar', 'microcart', status)
    },
    setWishlist ({ commit, state }, status) {
      commit('toggleSidebar', 'wishlist', status)
    },
    setAddtocart ({ commit, state }, status) {
      commit('toggleSidebar', 'addtocart', status)
    },
    setCategoryfilter ({ commit, state }, status) {
      commit('toggleSidebar', 'categoryfilter', status)
    },
    addSidebarPath ({ commit }, pathItem) {
      commit('addSidebarPath', pathItem)
    },
    removeLastSidebarPath ({ commit }) {
      commit('removeSidebarPath')
    }
  },
  getters: {
    getViewport: state => state.viewport,
    getSidebarPath: state => state.sidebarPath,
    getSidebarAnimation: state => state.sidebarAnimation
  }
}

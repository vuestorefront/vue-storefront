import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

export const homepageStore = {
  namespaced: true,
  state: {
    newProducts: []
  },
  mutations: {
    setNewProducts (state, payload) {
      state.newProducts = payload
    }
  },
  actions: {
    async fetchNewProducts ({ dispatch, commit }) {
      const result = await dispatch('product/list', {
        query: prepareQuery({ queryConfig: 'newProducts' }),
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      commit('setNewProducts', result.items)
      return result.items
    }
  },
  getters: {
    getNewProducts: state => {
      return state.newProducts
    }
  }
}

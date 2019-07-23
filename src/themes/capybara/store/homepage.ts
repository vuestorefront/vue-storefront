import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'

export const homepageStore = {
  namespaced: true,
  state: {
    new_prroducts: []
  },
  mutations: {
    setNewProducts (state, payload) {
      state.new_products = payload
    }
  },
  actions: {
    async fetchNewProducts ({ dispatch, commit }) {
      const result = await dispatch('product/list', {
        query: prepareQuery({ queryConfig: 'newProducts' }),
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      commit('setNewProducts', result)
    }
  }
}

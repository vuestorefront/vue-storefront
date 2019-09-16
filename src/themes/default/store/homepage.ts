import {prepareQuery} from '@vue-storefront/core/modules/catalog/queries/common'

export const homepageStore = {
  namespaced: true,
  state: {
    new_collection: []
  },
  actions: {
    async fetchNewCollection ({ commit, dispatch }) {
      const newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })

      const newProductsResult = await dispatch('product/list', {
        query: newProductsQuery,
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      const configuredProducts = await dispatch(
        'category-next/configureProducts',
        { products: newProductsResult.items 
      }, { root: true })
      commit('SET_NEW_COLLECTION', configuredProducts)
    }
  },
  mutations: {
    SET_NEW_COLLECTION (state, products) {
      state.new_collection = products || []
    }
  },
  getters: {
    getEverythingNewCollection (state) {
      return state.new_collection
    }
  }
}

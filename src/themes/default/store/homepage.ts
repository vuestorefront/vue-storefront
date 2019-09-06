import {prepareQuery} from '@vue-storefront/core/modules/catalog/queries/common'

export const homepageStore = {
  namespaced: true,
  state: {
    new_collection: []
  },
  actions: {
    fetchNewCollection ({ commit, dispatch }) {
      const newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })

      dispatch('product/list', {
        query: newProductsQuery,
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
        .then(newProductsResult => newProductsResult && dispatch(
          'category-next/configureProducts',
          { products: newProductsResult.items },
          { root: true })
        ).then(configuredProducts => commit('SET_NEW_COLLECTION', configuredProducts))
    }
  },
  mutations: {
    SET_NEW_COLLECTION (state, products) {
      state.new_collection = products || []
    }
  }
}

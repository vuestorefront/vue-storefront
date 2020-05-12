import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import config from 'config'

export const homepageStore = {
  namespaced: true,
  state: {
    new_collection: [],
    bestsellers: []
  },
  actions: {
    async fetchNewCollection ({ commit, dispatch }) {
      const newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })

      let newProductsResult = await dispatch('product/list', {
        query: newProductsQuery,
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      if (!config.entities.product.enableProductNext) {
        newProductsResult.items = await dispatch(
          'category-next/configureProducts',
          { products: newProductsResult.items
          }, { root: true })
      }
      commit('SET_NEW_COLLECTION', newProductsResult.items)
    },
    async loadBestsellers ({ commit, dispatch }) {
      const response = await dispatch('product/list', {
        query: prepareQuery({ queryConfig: 'bestSellers' }),
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })

      commit('SET_BESTSELLERS', response.items)
    }
  },
  mutations: {
    SET_NEW_COLLECTION (state, products) {
      state.new_collection = products || []
    },
    SET_BESTSELLERS (state, bestsellers) {
      state.bestsellers = bestsellers
    }
  },
  getters: {
    getEverythingNewCollection (state) {
      return state.new_collection
    },
    getBestsellers (state) {
      return state.bestsellers
    }
  }
}

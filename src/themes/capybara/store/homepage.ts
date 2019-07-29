import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import heroData from 'src/themes/capybara/assets/homepage/hero.json'

export const homepageStore = {
  namespaced: true,
  state: {
    newProducts: [],
    slides: []
  },
  mutations: {
    setNewProducts (state, payload) {
      state.newProducts = payload
    },
    setSlides (state, payload) {
      state.slides = payload
    }
  },
  actions: {
    async getNewProducts ({ dispatch, commit }) {
      const result = await dispatch('product/list', {
        query: prepareQuery({ queryConfig: 'newProducts' }),
        size: 8,
        sort: 'created_at:desc'
      }, { root: true })
      commit('setNewProducts', result.items)
      return result.items
    },
    async getSlides ({ commit }) {
      commit('setSlides', heroData)
      return heroData
    }
  },
  getters: {
    getNewProducts: state => {
      return state.newProducts
    },
    getSlides: state => {
      return state.slides
    }
  }
}

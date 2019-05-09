// import Vue from 'vue'
import { ActionTree } from 'vuex'
import * as types from './mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import CategoryState from './CategoryState'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { buildFilterProductsQuery } from '@vue-storefront/core/helpers'
import config from 'config'

const actions: ActionTree<CategoryState, RootState> = {
  async initCategoryModule ({ getters, dispatch }) {
    if (!getters.getCategories.length) {
      await dispatch('getCategories')
    }
  },
  async searchProducts ({ commit, dispatch, rootState }, { category } = {}) {
    await dispatch('initCategoryModule')
    console.error('QUERIES', rootState.route.query)
    // const category = await store.dispatch('category/single', { key: store.state.config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: route.params.slug })
    const searchCategory = category ? category : await dispatch('getCurrentCategory')
    let filterQr = buildFilterProductsQuery(searchCategory)
    const x = await quickSearchByQuery({ query: filterQr })
    commit(types.CATEGORY_SET_PRODUCTS, x.items)
    return x.items
  },
  async getCurrentCategory ({ dispatch, rootState }) {
    return await dispatch('category/single', { key: config.products.useMagentoUrlKeys ? 'url_key' : 'slug', value: rootState.route.params.slug }, {root: true})
  },
  async fetchCategories ({ dispatch }) {
    const res = await dispatch('category/list', {}, {root: true})
    return res.items
  },
  async getCategories ({ commit, dispatch }) {
    const categories = await dispatch('fetchCategories')
    commit(types.CATEGORY_SET_CATEGORIES, categories)
    return categories
  }
}

export default actions

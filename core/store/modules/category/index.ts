import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '../../types/RootState'
import CategoryState from './types/CategoryState'

const category: Module<CategoryState, RootState> = {
  namespaced: true,
  state: {
    list: [],
    current: {},
    filters: {
      available: {},
      chosen: {}
    },
    breadcrumbs: {
      routes: []
    },
    current_product_query: null,
    current_path: [] // list of categories from root to current
  },
  getters,
  actions,
  mutations
}

export default category

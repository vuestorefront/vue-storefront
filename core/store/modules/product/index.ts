import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '../../types/RootState'
import ProductState from './types/ProductState'

const product: Module<ProductState, RootState> = {
  namespaced: true,
  state: {
    breadcrumbs: {
      routes: [],
      name: ''
    },
    current: null, // shown product
    current_options: {
      color: [],
      size: []
    },
    current_configuration: {},
    parent: null,
    list: [],
    original: null, // default, not configured product
    related: {},
    offlineImage: null,
    current_custom_options: {},
    current_bundle_options: {},
    custom_options_validators: {},
    productLoadStart: 0,
    productLoadPromise: null
  },
  getters,
  actions,
  mutations
}

export default product

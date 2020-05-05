import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import RootState from '@vue-storefront/core/types/RootState'
import ProductState from '../../types/ProductState'

export const productModule: Module<ProductState, RootState> = {
  namespaced: true,
  state: {
    // TODO use breadcrumbs from category-next, leave here for backward compatibility
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
    list: {
      start: 0,
      perPage: 50,
      total: 0,
      items: []
    },
    original: null, // default, not configured product
    related: {},
    offlineImage: null,
    current_custom_options: {},
    current_bundle_options: {},
    custom_options_validators: {},
    productLoadStart: 0,
    productLoadPromise: null,
    productGallery: []
  },
  getters,
  actions,
  mutations
}

export const nonReactiveState = {
  list: []
}

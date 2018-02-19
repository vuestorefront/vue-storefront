import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    breadcrumbs: {routes: []},
    configured: null, // configured product with variant selected
    current: null, // shown product
    current_options: {color: [], size: []},
    current_configuration: {},
    parent: null,
    list: [],
    original: null, // default, not configured product
    related: {}
  },
  getters,
  actions,
  mutations
}

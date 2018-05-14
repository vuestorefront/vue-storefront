import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    breadcrumbs: {routes: []},
    current: null, // shown product
    current_options: {color: [], size: []},
    current_configuration: {},
    parent: null,
    list: [],
    original: null, // default, not configured product
    related: {},
    offlineImage: null,
    current_custom_options: {},
    current_bundle_options: {},
    custom_options_validators: {}
  },
  getters,
  actions,
  mutations
}

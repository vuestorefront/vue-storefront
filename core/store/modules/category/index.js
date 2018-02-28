import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    list: [],
    current: {},
    filters: { available: {}, chosen: {} },
    breadcrumbs: {routes: []},
    current_path: [] // list of categories from root to current
  },
  getters,
  actions,
  mutations
}

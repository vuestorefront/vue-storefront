import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    list: [],
    current: {},
    filters: { color: [], size: [], price: [] },
    breadcrumbs: {routes: []},
    current_path: [] // list of categories from root to current
  },
  getters,
  actions,
  mutations
}

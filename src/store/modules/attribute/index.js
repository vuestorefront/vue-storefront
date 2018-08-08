import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    list_by_code: {},
    list_by_id: {},
    labels: {}
  },
  getters,
  actions,
  mutations
}

import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    rules: []
  },
  actions,
  mutations
}

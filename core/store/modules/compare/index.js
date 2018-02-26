import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    compare: false,
    itemsCompare: []
  },
  getters,
  actions,
  mutations
}

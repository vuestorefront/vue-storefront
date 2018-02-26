import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    checkoutQueue: [] // queue of orders to be sent to the server
  },
  actions,
  mutations
}

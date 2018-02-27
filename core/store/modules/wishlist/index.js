import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    wishlist: false,
    itemsWishlist: []
  },
  getters,
  actions,
  mutations
}

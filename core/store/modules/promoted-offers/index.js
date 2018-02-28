import getters from './getters'
import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    banners: {
      'mainBanners': [],
      'smallBanners': [],
      'productBanners': []
    }
  },
  getters,
  actions,
  mutations
}

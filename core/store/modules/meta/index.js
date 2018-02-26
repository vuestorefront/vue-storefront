import config from 'config'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    title: config.meta.shopName,
    description: config.meta.description,
    suffix: config.meta.titleSuffix
  },
  getters,
  actions,
  mutations
}

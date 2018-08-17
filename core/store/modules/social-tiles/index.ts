import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import RootState from '../../types/RootState'
import SocialTilesState from './types/SocialTilesState'

const socialTiles: Module<SocialTilesState, RootState> = {
  namespaced: true,
  state: {
    tiles: []
  },
  getters,
  actions,
  mutations
}

export default socialTiles

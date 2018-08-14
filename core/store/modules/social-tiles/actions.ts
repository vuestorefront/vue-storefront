import { ActionTree } from 'vuex'
import RootState from '../../types/RootState'
import SocialTilesState from './types/SocialTilesState'

const actions: ActionTree<SocialTilesState, RootState> = {
  updateSocialTiles ({commit}, data) {
    commit('updateSocialTiles', data)
  }
}

export default actions

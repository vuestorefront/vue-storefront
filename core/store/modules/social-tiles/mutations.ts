import { MutationTree } from 'vuex'
import SocialTilesState from './types/SocialTilesState'

const mutations: MutationTree<SocialTilesState> = {
  updateSocialTiles (state, data) {
    state.tiles = data
  }
}

export default mutations

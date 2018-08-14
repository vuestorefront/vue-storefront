import { GetterTree } from 'vuex'
import RootState from '../../types/RootState'
import SocialTilesState from './types/SocialTilesState'

const getters: GetterTree<SocialTilesState, RootState> = {
  getSocialTiles: state => {
    return state.tiles
  }
}

export default getters

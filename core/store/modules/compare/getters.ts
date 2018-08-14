import { GetterTree } from 'vuex'
import RootState from '../../types/RootState'
import CompareState from './types/CompareState'

const getters: GetterTree<CompareState, RootState> = {
  isActive (state) {
    return state.items.length > 0
  }
}

export default getters

import { GetterTree } from 'vuex'
import RootState from '../../types/RootState'
import CategoryState from './types/CategoryState'

const getters: GetterTree<CategoryState, RootState> = {
  current: (state) => state.current,
  list: (state) => state.list
}

export default getters

import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/store/types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  contentById: (state) => (id) => {
    console.log('$$$ getter', id, '|| ', state.items[id])
    return state.items[id]
  },
  contentByType: (state) => (type) => {
    let result = []
    for (let element in state.items) {
      if (state.items[element].type === type) {
        result.push(state.items[element])
      }
    }
    return result
  },
  contentByTag: (state) => (tag) => {
    let result = []
    for (let element in state.items) {
      if (state.items[element].tags.includes(tag)) {
        result.push(state.items[element])
      }
    }
    return result
  }
}

export default getters

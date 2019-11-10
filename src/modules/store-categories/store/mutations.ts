import { MutationTree } from 'vuex'
import StoreCategoriesState from '../types/StoreCategoriesState'

const mutations: MutationTree<StoreCategoriesState> = {
  updateStoreCategories (state, data) {
    state.banners = data
  },
  SET_HEAD_IMAGE (state, headImage) {
    state.headImage = headImage
  }
}

export default mutations

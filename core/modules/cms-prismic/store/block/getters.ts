import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/store/types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  contentById: (state) => (id) => {
    return state.id.find(item => item.id === id)
  },
  contentByType: (state) => (type) => {
    return state.type.find(item => item.type === type)
  }
}

export default getters

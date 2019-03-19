import { GetterTree } from 'vuex'
import CmsBlockState from '../../types/CmsBlockState'
import RootState from '@vue-storefront/store/types/RootState'

const getters: GetterTree<CmsBlockState, RootState> = {
  contentMap: (state) => {
    return state.items
  }
}

export default getters

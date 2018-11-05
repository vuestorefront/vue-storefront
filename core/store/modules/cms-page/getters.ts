import { GetterTree } from 'vuex'
import CmsPageState from './types/CmsPageState'
import RootState from '../../types/RootState'

const getters: GetterTree<CmsPageState, RootState> = {
  cmsPages: (state) => state.cmsPages
}

export default getters

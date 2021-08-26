import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import CmsPageState from '../../types/CmsPageState'
import { Logger } from '@vue-storefront/core/lib/logger'

const getters: GetterTree<CmsPageState, RootState> = {
  cmsPages: (state, getters) => {
    Logger.error('The getter cmsPage/cmsPages has been deprecated please change to cmsPage/getCmsPages')()

    return getters.getCmsPages
  },
  getCmsPages: (state) => state.items,
  hasItems: (state) => state.items && state.items.length > 0,
  findItems: (state) => ({ key, value }) => state.items.find(p => p[key] === value)
}

export default getters

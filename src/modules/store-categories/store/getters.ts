import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import StoreCategoriesState from '../types/StoreCategoriesState'
import _ from 'lodash'

const getters: GetterTree<StoreCategoriesState, RootState> = {
  getStoreCategories: state => {
    return state.banners
  },
  getHeadImage: state => state.headImage,
  getStoreLogo: state => (!_.isNull(state.headImage) && !_.isUndefined(_.get(state.headImage, 'logo'))) ? _.get(state.headImage, 'logo') : '/assets/logo.svg'
}

export default getters

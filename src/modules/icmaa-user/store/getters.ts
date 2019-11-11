import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import UserState from '../types/UserState'
import UserProfile from '../types/UserProfile'

import isEmpty from 'lodash-es/isEmpty'

const getters: GetterTree<UserState, RootState> = {
  getCustomer: (state) => state.current,
  getCluster: (state): string|false => {
    return (!isEmpty(state.sessionData) && state.sessionData.cluster)
      ? state.sessionData.cluster.toString() : false
  },
  getClusterString: (state, getters, RootState, RootGetters): string|false => {
    if (getters.getCluster) {
      return RootGetters['attribute/getOptionLabel']({ attributeKey: 'customercluster', optionId: getters.getCluster })
    }

    return false
  }
}

export default getters

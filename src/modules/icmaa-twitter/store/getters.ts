import { GetterTree } from 'vuex'
import TwitterState, { StatusStateListItem, StatusStateItem } from '../types/TwitterState'
import RootState from '@vue-storefront/core/types/RootState'

const getters: GetterTree<TwitterState, RootState> = {
  getStatus: (state): StatusStateListItem[] => state.status,
  getStatusByScreenName: (state) => (screenName): StatusStateItem[]|boolean => {
    const status: StatusStateListItem = state.status.find(s => s.screenName === screenName)
    return status ? status.status : false
  }
}

export default getters

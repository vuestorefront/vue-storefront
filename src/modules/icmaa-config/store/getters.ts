import { GetterTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import ConfigState, { StoreView } from '../types/ConfigState'

import merge from 'lodash-es/merge'

const getters: GetterTree<ConfigState, RootState> = {
  getMap: (state): StoreView[] => state.map,
  getCurrentStoreConfig: (state, getters): StoreView|boolean => {
    const storeCode = getters.getCurrentStore.storeCode
    if (storeCode) {
      const storeConfig = state.map.find(s => s.storeCode === storeCode) || false
      return merge(
        {},
        storeConfig || {},
        getters.getCurrentStore
      )
    }

    return false
  },
  getCurrentStore: (state, getters, RootState): StoreView => {
    return RootState.storeView
  }
}

export default getters

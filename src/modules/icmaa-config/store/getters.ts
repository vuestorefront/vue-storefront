import { GetterTree } from 'vuex'
import config from 'config'
import RootState from '@vue-storefront/core/types/RootState'
import ConfigState, { StoreView } from '../types/ConfigState'
import { getExtendedStoreviewConfig } from '../helpers'

import merge from 'lodash-es/merge'
import cloneDeep from 'lodash-es/cloneDeep'

const getters: GetterTree<ConfigState, RootState> = {
  getMap: (state): StoreView[] => state.map,
  getCompleteMap: (state, getters): StoreView[] => {
    const map = cloneDeep(getters.getMap)
    const { tax, i18n, elasticsearch, storeCode, seo } = config
    const defaultStoreViews = map.map(s => config.storeViews[s.storeCode])

    return cloneDeep(getters.getMap)
      .map(extendedStoreView => {
        const defaults = cloneDeep({ tax, i18n, elasticsearch, storeCode, seo })
        const defaultStoreConfig = defaultStoreViews.find(s => extendedStoreView.storeCode === s.storeCode)
        const extendedStoreConfig = getExtendedStoreviewConfig(defaultStoreConfig, defaultStoreViews)
        const result = merge(defaults, extendedStoreConfig, extendedStoreView)
        return result
      })
  },
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

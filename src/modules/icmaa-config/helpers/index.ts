import { StoreView } from '../types/ConfigState'
import merge from 'lodash-es/merge'

export function getExtendedStoreviewConfig (storeView: StoreView, configStateMap: StoreView[]): StoreView {
  if (storeView.extend) {
    const parent: StoreView = configStateMap.find(s => s.storeCode === storeView.extend)
    if (parent) {
      storeView = merge(
        {},
        getExtendedStoreviewConfig(parent, configStateMap),
        storeView
      )
    }
  }

  return storeView
}

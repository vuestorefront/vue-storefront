import { StoreView } from './../types'
import { storeViews } from 'config'
import { getExtendedStoreviewConfig } from '.'

const getStoreViewByStoreCode = (storeCode: string): StoreView => {
  const { mapStoreUrlsFor = [] } = storeViews
  for (let storeViewProp of mapStoreUrlsFor) {
    if (!storeViews[storeViewProp]) continue
    const storeView = getExtendedStoreviewConfig(storeViews[storeViewProp])

    if (storeView.storeCode === storeCode) return storeView
  }

  return null
}

export default getStoreViewByStoreCode

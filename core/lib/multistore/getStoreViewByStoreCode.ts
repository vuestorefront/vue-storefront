import { StoreView } from './../types'
import config from 'config'
import { getExtendedStoreviewConfig } from '.'

const getStoreViewByStoreCode = (storeCode: string): StoreView => {
  const { mapStoreUrlsFor = [] } = config.storeViews
  for (let storeViewProp of mapStoreUrlsFor) {
    const storeView = getExtendedStoreviewConfig(config.storeViews[storeViewProp])

    if (storeView.storeCode === storeCode) return storeView
  }

  return null
}

export default getStoreViewByStoreCode

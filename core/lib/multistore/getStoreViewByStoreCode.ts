import { StoreView } from './../types'
import { getExtendedStoreviewConfig } from '.'
const config = require('config')

const getStoreViewByStoreCode = (storeCode: string): StoreView => {
  const { mapStoreUrlsFor = [] } = config.storeViews
  for (let storeViewProp of mapStoreUrlsFor) {
    if (!config.storeViews[storeViewProp]) continue
    const storeView = getExtendedStoreviewConfig(config.storeViews[storeViewProp])

    if (storeView.storeCode === storeCode) return storeView
  }

  return null
}

export default getStoreViewByStoreCode

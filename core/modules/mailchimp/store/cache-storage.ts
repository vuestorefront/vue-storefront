import { KEY } from '../'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'

const storeView = currentStoreView()
const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
export const cacheStorage = new UniversalStorage(localForage.createInstance({
  name: dbNamePrefix + 'shop',
  storeName: KEY
}))
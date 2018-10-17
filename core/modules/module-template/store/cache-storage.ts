// Use this if you want to enable offline storage or long-time caching for your module
// Read more: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20data.md
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
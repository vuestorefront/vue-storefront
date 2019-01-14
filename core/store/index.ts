import Vue from 'vue'
import Vuex from 'vuex'
import { Plugin } from 'vuex'
import * as localForage from 'localforage'
import UniversalStorage from './lib/storage'
import { currentStoreView } from './lib/multistore'
import RootState from './types/RootState'
import * as userTypes from '@vue-storefront/core/modules/user/store/mutation-types'
import * as checkoutTypes from '@vue-storefront/core/modules/checkout/store/checkout/mutation-types'
import * as cartTypes from '@vue-storefront/core/modules/cart/store/mutation-types'

const types = {...userTypes, ...checkoutTypes, ...cartTypes }

Vue.use(Vuex)

const state = {
  version: '',
  __DEMO_MODE__: false,
  config: {},
  cart: {},
  checkout: {},
  cms: {},
  compare: {},
  product: {},
  shipping: {},
  user: {},
  ui: {},
  wishlist: {},
  attribute: '',
  category: {
    current_path: '',
    current_product_query: {},
    current: {
      slug: '',
      name: ''
    },
    filters: {}
  },
  stock: {
    cache: []
  },
  storeView: {},
  twoStageCachingDelta1: 0,
  twoStageCachingDelta2: 0,
  twoStageCachingDisabled: false,
  userTokenInvalidated: null,
  userTokenInvalidateAttemptsCount: 0,
  userTokenInvalidateLock: 0
}

export function getMutationData (mutation) {
  let nameArray = mutation.split('/')
  let storeName, actionName
  if (nameArray.length) {
    storeName = nameArray[0]
    actionName = nameArray.slice(1).join('/')
    return { actionName, storeName }
  } else {
    console.error('Store mutation name is incorrectly formed')
  }
}

let rootStore = new Vuex.Store<RootState>({
  // TODO: refactor it to return just the constructor to avoid event-bus and i18n shenigans; challenge: the singleton management OR add i18n and eventBus here to rootStore instance?  modules: {
  state
})

export default rootStore

export function initStore () {
  const config = rootStore.state.config
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
  Vue.prototype.$db = {
    currentStoreCode: storeView.storeCode,
    ordersCollection: new UniversalStorage(localForage.createInstance({
      name: 'shop',
      storeName: 'orders',
      driver: localForage[config.localForage.defaultDrivers['orders']]
    })),
    categoriesCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'categories',
      driver: localForage[config.localForage.defaultDrivers['categories']]
    })),
    attributesCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'attributes',
      driver: localForage[config.localForage.defaultDrivers['attributes']]
    })),
    cartsCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'carts',
      driver: localForage[config.localForage.defaultDrivers['carts']]
    })),
    elasticCacheCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'elasticCache',
      driver: localForage[config.localForage.defaultDrivers['elasticCache']]
    }), true, rootStore.state.config.server.elasticCacheQuota),
    productsCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'products',
      driver: localForage[config.localForage.defaultDrivers['products']]
    })),
    claimsCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'claims',
      driver: localForage[config.localForage.defaultDrivers['claims']]
    })),
    compareCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'compare',
      driver: localForage[config.localForage.defaultDrivers['compare']]
    })),
    usersCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'user',
      driver: localForage[config.localForage.defaultDrivers['user']]
    })),
    syncTaskCollection: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'syncTasks',
      driver: localForage[config.localForage.defaultDrivers['syncTasks']]
    })),
    checkoutFieldsCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'checkoutFieldValues',
      driver: localForage[config.localForage.defaultDrivers['checkoutFieldValues']]
    })),
    ordersHistoryCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'ordersHistory',
      driver: localForage[config.localForage.defaultDrivers['ordersHistory']]
    })),
    cmsData: new UniversalStorage(localForage.createInstance({
      name: dbNamePrefix + 'shop',
      storeName: 'cms'
    }))
  }
}

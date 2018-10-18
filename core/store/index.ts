import Vue from 'vue'
import Vuex from 'vuex'
import { Plugin } from 'vuex'
import * as types from './mutation-types'
import * as localForage from 'localforage'
import UniversalStorage from './lib/storage'
import { currentStoreView } from './lib/multistore'
import RootState from './types/RootState'

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

const mutations = {
  TOPICS_LIST: (state, topics) => {
    state.topics = topics
  },

  INCREMENT: (state) => {
    state.count++
  },

  DECREMENT: (state) => {
    state.count--
  }
}
// @TODO move into modules
const plugins: Plugin<RootState>[] = [
  store => {
    store.subscribe((mutation, state) => {
      let nameArray = mutation.type.split('/')
      let storeName, actionName
      if (nameArray.length) {
        storeName = nameArray[0]
        actionName = nameArray.slice(1).join('/')
      } else {
        console.error('Store mutation name is incorrectly formed')
      }

      if (actionName === types.CART_LOAD_CART || actionName === types.CART_ADD_ITEM || actionName === types.CART_DEL_ITEM || actionName === types.CART_UPD_ITEM || actionName === types.CART_UPD_ITEM_PROPS) { // check if this mutation is cart related
        Vue.prototype.$db.cartsCollection.setItem('current-cart', state.cart.cartItems).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (actionName === types.CART_LOAD_CART_SERVER_TOKEN) {
        Vue.prototype.$db.cartsCollection.setItem('current-cart-token', state.cart.cartServerToken).catch((reason) => {
          console.error(reason)
        })
      }
      if (storeName === types.SN_WISHLIST) { // check if this mutation is wishlist related
        Vue.prototype.$db.wishlistCollection.setItem('current-wishlist', state.wishlist.items).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (storeName === types.SN_COMPARE) { // check if this mutation is compare related
        Vue.prototype.$db.compareCollection.setItem('current-compare', state.compare.items).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (actionName === types.USER_INFO_LOADED) { // check if this mutation is user related
        Vue.prototype.$db.usersCollection.setItem('current-user', state.user.current).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (actionName === types.USER_ORDERS_HISTORY_LOADED) { // check if this mutation is user related
        Vue.prototype.$db.ordersHistoryCollection.setItem('orders-history', state.user.orders_history).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (actionName === types.USER_TOKEN_CHANGED) { // check if this mutation is user related
        Vue.prototype.$db.usersCollection.setItem('current-token', state.user.token).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
        if (state.user.refreshToken) {
          Vue.prototype.$db.usersCollection.setItem('current-refresh-token', state.user.refreshToken).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        }
      }
      if (storeName === types.SN_CHECKOUT) {
        if (actionName === types.CHECKOUT_SAVE_PERSONAL_DETAILS) {
          Vue.prototype.$db.checkoutFieldsCollection.setItem('personal-details', state.checkout.personalDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        } else if (actionName === types.CHECKOUT_SAVE_SHIPPING_DETAILS) {
          Vue.prototype.$db.checkoutFieldsCollection.setItem('shipping-details', state.checkout.shippingDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        } else if (actionName === types.CHECKOUT_SAVE_PAYMENT_DETAILS) {
          Vue.prototype.$db.checkoutFieldsCollection.setItem('payment-details', state.checkout.paymentDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        }
      }
      if (actionName === 'setCmsBlock' || actionName === 'setCmsPage') {
        Vue.prototype.$db.cmsData.setItem('cms-data', state.cms).catch((reason) => {
          console.error(reason)
        })
      }
    })
  }
]

let rootStore = new Vuex.Store<RootState>({
  // TODO: refactor it to return just the constructor to avoid event-bus and i18n shenigans; challenge: the singleton management OR add i18n and eventBus here to rootStore instance?  modules: {
  state,
  mutations,
  plugins
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
    })),
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
    wishlistCollection: new UniversalStorage(localForage.createInstance({
      name: (config.cart.multisiteCommonCart ? '' : dbNamePrefix) + 'shop',
      storeName: 'wishlist',
      driver: localForage[config.localForage.defaultDrivers['wishlist']]
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

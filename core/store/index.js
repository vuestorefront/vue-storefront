import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import localForage from 'localforage'
import UniversalStorage from 'core/lib/storage'
import order from './modules/order'
import product from './modules/product'
import category from './modules/category'
import attribute from './modules/attribute'
import cart from './modules/cart'
import wishlist from './modules/wishlist'
import compare from './modules/compare'
import user from './modules/user'
import payment from './modules/payment'
import shipping from './modules/shipping'
import ui from './modules/ui-store'
import checkout from './modules/checkout'
import homepage from './modules/homepage'
import stock from './modules/stock'
import tax from './modules/tax'
import social from './modules/social-tiles'
import claims from './modules/claims'
import sync from './modules/sync'
import promoted from './modules/promoted-offers'
import themeModules from 'theme/store'

Vue.prototype.$db = {
  ordersCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'orders'
  })),

  categoriesCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'categories'
  })),

  attributesCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'attributes'
  })),

  cartsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'carts'
  })),

  elasticCacheCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'elasticCache'
  })),

  productsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'products'
  })),

  claimsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'claims'
  })),

  wishlistCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'wishlist'
  })),

  compareCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'compare'
  })),

  usersCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'user'
  })),

  syncTaskCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'syncTasks'
  })),

  checkoutFieldsCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'checkoutFieldValues'
  })),

  newsletterPreferencesCollection: new UniversalStorage(localForage.createInstance({
    name: 'shop',
    storeName: 'newsletterPreferences'
  }))
}

global.db = Vue.prototype.$db // localForage instance

Vue.use(Vuex)

const state = {
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

const plugins = [
  store => {
    store.subscribe((mutation, state) => {
      if (mutation.type.indexOf(types.SN_CART) === 0) { // check if this mutation is cart related
        global.db.cartsCollection.setItem('current-cart', state.cart.cartItems).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
        global.db.cartsCollection.setItem('current-cart-token', state.cart.cartServerToken).catch((reason) => {
          console.error(reason)
        })
      }
      if (mutation.type.indexOf(types.SN_WISHLIST) === 0) { // check if this mutation is wishlist related
        global.db.wishlistCollection.setItem('current-wishlist', state.wishlist.itemsWishlist).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (mutation.type.indexOf(types.SN_COMPARE) === 0) { // check if this mutation is compare related
        global.db.compareCollection.setItem('current-compare', state.compare.itemsCompare).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        })
      }
      if (mutation.type.indexOf(types.USER_INFO_LOADED) >= 0) { // check if this mutation is user related
        global.db.usersCollection.setItem('current-user', state.user.current).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (mutation.type.indexOf(types.USER_TOKEN_CHANGED) >= 0) { // check if this mutation is user related
        global.db.usersCollection.setItem('current-token', state.user.token).catch((reason) => {
          console.error(reason) // it doesn't work on SSR
        }) // populate cache
      }
      if (mutation.type.indexOf(types.SN_CHECKOUT) === 0) {
        if (mutation.type.indexOf(types.CHECKOUT_SAVE_PERSONAL_DETAILS) > 0) {
          global.db.checkoutFieldsCollection.setItem('personal-details', state.checkout.personalDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        } else if (mutation.type.indexOf(types.CHECKOUT_SAVE_SHIPPING_DETAILS) > 0) {
          global.db.checkoutFieldsCollection.setItem('shipping-details', state.checkout.shippingDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        } else if (mutation.type.indexOf(types.CHECKOUT_SAVE_PAYMENT_DETAILS) > 0) {
          global.db.checkoutFieldsCollection.setItem('payment-details', state.checkout.paymentDetails).catch((reason) => {
            console.error(reason) // it doesn't work on SSR
          }) // populate cache
        }
      }
      if (mutation.type.indexOf(types.USER_UPDATE_PREFERENCES) >= 0) {
        global.db.newsletterPreferencesCollection.setItem('newsletter-preferences', state.user.newsletter).catch((reason) => {
          console.error(reason)
        })
      }
    })
  }
]

export default new Vuex.Store({
  modules: {
    order,
    product,
    category,
    attribute,
    cart,
    wishlist,
    compare,
    user,
    payment,
    shipping,
    ui,
    homepage,
    social,
    stock,
    checkout,
    tax,
    claims,
    sync,
    promoted,
    ...themeModules
  },
  state,
  mutations,
  plugins
})

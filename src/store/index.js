import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import * as config from '../config.js'

// import * as types from './mutation-types'
import * as localForage from 'localforage'

Vue.prototype.$localDb = localForage.createInstance({
  name: 'store'
})
global.localDb = Vue.prototype.$localDb // localForage instance

import checkout from './modules/checkout'
import catalog from './modules/catalog'
import cart from './modules/cart'

Vue.use(Vuex)

const defaultState = {
}

const inBrowser = typeof window !== 'undefined'

// if in browser, use pre-fetched state injected by SSR
const state = (inBrowser && window.__INITIAL_STATE__) || defaultState

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
    store.subscribe((mutation, store) => {
      if (mutation.type.indexOf(types.SN_CHECKOUT) === 0) { // check if this mutation is cart related
        global.localDb.setItem('vue-storefront-orders', store.checkout.checkoutQueue, (err) => {
          if (err) { throw new Error(err) } else {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.controller.postMessage({ config: config, queue: store.checkout.checkoutQueue, command: types.CHECKOUT_PROCESS_QUEUE })
            } else { // no service workers supported push the queue manualy

            }
          }
        })
      }
      if (mutation.type.indexOf(types.SN_CART) === 0) { // check if this mutation is cart related
        global.localDb.setItem('vue-storefront-cart', store.cart.cartItems, (err) => {
          if (err) throw new Error(err)
        })
      }
    })
  }
]

export default new Vuex.Store({
  modules: {
    checkout,
    catalog,
    cart
  },
  state,
  mutations,
  plugins
})

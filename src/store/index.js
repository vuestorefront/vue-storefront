import Vue from 'vue'
import Vuex from 'vuex'

// import * as types from './mutation-types'
import * as localForage from 'localforage'

Vue.prototype.$localDb = localForage.createInstance({
  name: 'store'
})
global.localDb = Vue.prototype.$localDb // localForage instance

import checkout from './modules/checkout'
import catalog from './modules/catalog'
import cart from './modules/cart'
import * as types from './mutation-types'

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

export default new Vuex.Store({
  modules: {
    checkout,
    catalog,
    cart
  },
  state,
  mutations
})

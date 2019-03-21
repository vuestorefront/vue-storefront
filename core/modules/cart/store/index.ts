import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import CartState from '../types/CartState'

export const module: Module<CartState, any> = {
  namespaced: true,
  state: {
    isMicrocartOpen: false,
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerPullAt: 0,
    cartServerTotalsAt: 0,
    cartServerCreatedAt: 0,
    cartServerMethodsRefreshAt: 0,
    cartServerBypassAt: 0,
    cartSavedAt: Date.now(),
    bypassToAnon: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: [],
    payment: [],
    cartItemsHash: '',
    bypassCount: 0,
    cartItems: [] // TODO: check if it's properly namespaced
  },
  getters,
  actions,
  mutations,
}


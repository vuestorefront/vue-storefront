import { Module } from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import CartState from '../types/CartState'

export const cartStore: Module<CartState, any> = {
  namespaced: true,
  state: {
    isMicrocartOpen: false,
    itemsAfterPlatformTotals: {},
    platformTotals: null,
    platformTotalSegments: null,
    cartIsLoaded: false,
    cartServerToken: '', // server side ID to synchronize with Backend (for example Magento)
    shipping: [],
    payment: [],
    cartItemsHash: '',
    cartServerLastSyncDate: 0,
    cartServerLastTotalsSyncDate: 0,
    cartItems: [], // TODO: check if it's properly namespaced
    connectBypassCount: 0,
    isAddingToCart: false,
    isLocalDataLoaded: false,
    productDiscountedPrice: {},
    isShippingMethodsSyncing: false,
    isCartSyncing: false,
    isTotalsSyncing: false,
    isPaymentMethodsSyncing: false,
    isCouponProcessing: false,
    exchangeRate: 1
  },
  getters,
  actions,
  mutations
}

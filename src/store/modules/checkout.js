import * as types from '../mutation-types'

const store = {
  namespaced: true,
  state: {
    order: {}
  },
  mutations: {
    /**
     * Setup current order object
     * @param {Object} order Object
     */
    [types.ORDER_PLACE_ORDER] (state, order) {
      state.order = order
    }
  },
  getters: {
  },
  actions: {
    /**
     * Place order - send it to service worker queue
     * @param {Object} commit method
     * @param {Object} order order data to be send
     */
    placeOrder (context, { order }) {
      try {
        context.dispatch('order/placeOrder', order, {root: true})
      } catch (e) {
        if (e.name === 'ValidationError') {
          console.error(e.messages)
        } else {
          console.error(e)
        }
      }
    }
  }
}

export default store

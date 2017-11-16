import * as types from '../mutation-types'
import EventBus from 'src/event-bus/event-bus'

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
        context.dispatch('order/placeOrder', order, {root: true}).then(result => {
          context.dispatch('cart/clear', {}, {root: true})
        })
      } catch (e) {
        if (e.name === 'ValidationError') {
          console.error('Internal validation error; Order entity is not compliant with the schema', e.messages)
          EventBus.$emit('notification', {
            type: 'error',
            message: 'Internal validation error. Please check if all required fileds are filled in. Please contact us on contributors@vuestorefront.io',
            action1: { label: 'OK', action: 'close' }
          })
        } else {
          console.error(e)
        }
      }
    }
  }
}

export default store

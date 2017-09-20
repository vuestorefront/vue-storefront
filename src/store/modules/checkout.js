import * as types from '../mutation-types'
import { ValidationError } from 'lib/exceptions'
const Ajv = require('ajv') // json validator

// initial state
const state = {
  checkoutQueue: [] // queue of orders to be sent to the server
}

const getters = {
}

// actions
const actions = {

  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  placeOrder ({ commit }, order) {
    const ajv = new Ajv()
    const validate = ajv.compile(require('../../models/order_schema.json'))

    if (!validate(order)) { // schema validation of upcoming order
      throw new ValidationError(validate.errors)
    }
    commit(types.CHECKOUT_PLACE_ORDER, order)
  },

  loadQueue ({ commit }) {
    console.debug('Loading orders queue ...')
    global.localDb.getItem('vue-storefront-orders', (err, queue) => {
      if (err) throw new Error(err)
      commit(types.CHECKOUT_LOAD_QUEUE, queue)
    })
  }
}

// mutations
const mutations = {
  /**
   * Add order to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CHECKOUT_PLACE_ORDER] (state, order) {
    state.checkoutQueue.push(order)
    console.debug('Order placed, queue size is: ' + state.checkoutQueue.length)
  },
  /**
   * Add order to sync. queue
   * @param {Object} queue
   */
  [types.CHECKOUT_LOAD_QUEUE] (state, queue) {
    state.checkoutQueue = queue
    console.debug('Order queue loaded, queue size is: ' + state.checkoutQueue.length)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

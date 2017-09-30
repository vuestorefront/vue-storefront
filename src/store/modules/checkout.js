import * as types from '../mutation-types'
import { ValidationError } from 'lib/exceptions'
import * as entities from 'lib/entities'
import * as sw from 'lib/sw'
import config from '../../config'
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
  }
}

// mutations
const mutations = {
  /**
   * Add order to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CHECKOUT_PLACE_ORDER] (state, order) {
    const ordersCollection = global.db.ordersCollection
    const orderId = entities.uniqueEntityId(order) // timestamp as a order id is not the best we can do but it's enough
    order.order_id = orderId.toString()
    order.transmited = false
    order.created_at = new Date()
    order.updated_at = new Date()

    ordersCollection.setItem(orderId.toString(), order).catch((reason) => {
      console.debug(reason) // it doesn't work on SSR
    }).then((resp) => {
      sw.postMessage({ config: config, command: types.CHECKOUT_PROCESS_QUEUE }) // process checkout queue
      console.debug('Order placed, orderId = ' + orderId)
    }) // populate cache
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

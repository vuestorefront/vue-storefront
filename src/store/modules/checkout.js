import * as types from '../mutation-types'
import ValidationException from 'lib/exceptions'
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
    const validate = ajv.compile(require('../../models/order.schema.json'))

	  if (!validate(order)) { // schema validation of upcoming order
			throw new ValidationException(validate.errors)
			return;
		}				
    commit(types.CHECKOUT_PLACE_ORDER, order)
  }

}

// mutations
const mutations = {
  /**
   * Add product to cart
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.CHECKOUT_PLACE_ORDER] (state, { order }) {
    state.checkoutQueue.push(order)
    console.debug('Order placed, queue size is: ' + state.checkoutQueue.length)
  }
}

const plugins = [
  store => {
    store.subscribe((mutation, { store }) => {
      if (mutation.indexOf(types.SN_CHECKOUT) === 0) { // check if this mutation is cart related
        global.localDb.setItem('vue-storefront-orders', store.checkoutQueue, (err) => {
          if (err) throw new Error(err)
        })
      }
    })
  }
]

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  plugins
}

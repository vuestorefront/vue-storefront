import * as types from '../../mutation-types'
import EventBus from 'core/plugins/event-bus'
import { ValidationError } from 'core/lib/exceptions'
import store from '../../'
const Ajv = require('ajv') // json validator

export default {
  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  placeOrder ({ commit }, order) {
    const ajv = new Ajv()
    const validate = ajv.compile(require('core/models/order.schema.json'))

    if (!validate(order)) { // schema validation of upcoming order
      throw new ValidationError(validate.errors)
    } else {
      console.log(store.getters['cart/totals'])
      EventBus.$emit('order-before-placed', { order: order })
      commit(types.ORDER_PLACE_ORDER, order)
      EventBus.$emit('order-after-placed', { order: order })
      return true
    }
  }
}

import * as types from '../../mutation-types'
import EventBus from '../../lib/event-bus'
import { ValidationError } from '../../lib/exceptions'
import { currentStoreView } from '@vue-storefront/store/lib/multistore'
const Ajv = require('ajv') // json validator

export default {
  /**
   * Place order - send it to service worker queue
   * @param {Object} commit method
   * @param {Object} order order data to be send
   */
  placeOrder ({ commit }, order) {
    const ajv = new Ajv()
    const validate = ajv.compile(require('./order.schema.json'))

    const storeView = currentStoreView()
    if (storeView.storeCode) {
      order.store_code = storeView.storeCode
    }

    if (!validate(order)) { // schema validation of upcoming order
      throw new ValidationError(validate.errors)
    } else {
      EventBus.$emit('order-before-placed', { order: order })
      commit(types.ORDER_PLACE_ORDER, order)
      EventBus.$emit('order-after-placed', { order: order })
      return true
    }
  }
}

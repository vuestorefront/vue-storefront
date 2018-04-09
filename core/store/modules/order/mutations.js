import * as types from '../../mutation-types'
import * as entities from '../../lib/entities'
import EventBus from '../../lib/event-bus'
import config from 'config'

export default {
  /**
   * Add order to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.ORDER_PLACE_ORDER] (state, order) {
    const ordersCollection = global.$VS.db.ordersCollection
    const orderId = entities.uniqueEntityId(order) // timestamp as a order id is not the best we can do but it's enough
    order.order_id = orderId.toString()
    order.transmited = false
    order.created_at = new Date()
    order.updated_at = new Date()

    ordersCollection.setItem(orderId.toString(), order).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    }).then((resp) => {
      EventBus.$emit('order/PROCESS_QUEUE', { config: config }) // process checkout queue
      console.info('Order placed, orderId = ' + orderId)
    }) // populate cache
  }
}

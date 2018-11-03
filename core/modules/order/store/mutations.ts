import Vue from 'vue'
import { MutationTree } from 'vuex'
import * as types from './mutation-types'
import * as entities from '@vue-storefront/store/lib/entities'
import OrderState from '../types/OrderState'
import rootStore from '@vue-storefront/store'

const mutations: MutationTree<OrderState> = {
  /**
   * Add order to sync. queue
   * @param {Object} product data format for products is described in /doc/ElasticSearch data formats.md
   */
  [types.ORDER_PLACE_ORDER] (state, order) {
    const ordersCollection = Vue.prototype.$db.ordersCollection
    const orderId = entities.uniqueEntityId(order) // timestamp as a order id is not the best we can do but it's enough
    order.order_id = orderId.toString()
    order.transmited = false
    order.created_at = new Date()
    order.updated_at = new Date()

    ordersCollection.setItem(orderId.toString(), order, (err, resp) => {
      if (err) console.error(err)
      Vue.prototype.$bus.$emit('order/PROCESS_QUEUE', { config: rootStore.state.config }) // process checkout queue
      console.info('Order placed, orderId = ' + orderId)
    }).catch((reason) => {
      console.error(reason) // it doesn't work on SSR
    }) // populate cache
  }
}

export default mutations

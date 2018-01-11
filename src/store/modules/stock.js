import config from 'config'
import EventBus from 'src/event-bus'
import store from '../'

EventBus.$on('stock-after-check', (event) => { // example stock check callback
  store.dispatch('cart/getItem', event.product_sku).then((cartItem) => {
    if (cartItem) {
      if (!event.result.is_in_stock) {
        store.dispatch('cart/updateItem', { product: { warning_message: 'Out of the stock!', sku: event.product_sku, is_in_stock: false } })
      } else {
        store.dispatch('cart/updateItem', { product: { info_message: 'In stock!', sku: event.product_sku, is_in_stock: true } })
      }
      EventBus.$emit('cart-after-itemchanged', { item: cartItem })
    }
  })
  console.log('Stock quantity checked for ' + event.result.product_id + ', qty = ' + event.result.qty + ', response time: ' + (event.transmited_at - event.created_at) + ' ms')
  console.log(event)
})

const state = {
}

const getters = {
}
// actions
const actions = {

  /**
   * Reset current configuration and selected variatnts
   */
  check (context, { product, qty = 1 }) {
    return new Promise((resolve, reject) => {
      context.dispatch('sync/queue', { url: config.stock.endpoint + '/check/' + product.sku,
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        product_sku: product.sku,
        callback_event: 'stock-after-check'
      }, { root: true }).then(task => {
        resolve({ qty: product.stock.qty, status: product.stock.is_in_stock ? 'ok' : 'out_of_stock', onlineCheckTaskId: task.task_id }) // if not online, cannot check the source of true here
      })

        /**
         * "stock": {
              "min_sale_qty": 1,
              "qty_increments": 0,
              "stock_status_changed_auto": 0,
              "is_in_stock": true,
              "show_default_notification_message": false,
              "use_config_max_sale_qty": true,
              "product_id": 52,
              "use_config_qty_increments": true,
              "notify_stock_qty": 1,
              "manage_stock": true,
              "item_id": 52,
              "min_qty": 0,
              "use_config_min_qty": true,
              "use_config_notify_stock_qty": true,
              "stock_id": 1,
              "use_config_backorders": true,
              "max_sale_qty": 10000,
              "backorders": 0,
              "qty": 100,
              "use_config_enable_qty_inc": true,
              "is_decimal_divided": false,
              "enable_qty_increments": false,
              "is_qty_decimal": false,
              "use_config_manage_stock": true,
              "low_stock_date": null,
              "use_config_min_sale_qty": 1
              }
         */
    })
  }
}

// mutations
const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

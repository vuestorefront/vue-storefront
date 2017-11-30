import config from '../../config.json'

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
        }
      }, { root: true }).then(task => {
        console.log(product.stock)
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

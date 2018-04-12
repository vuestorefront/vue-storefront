import config from '../../lib/config'

export default {
  /**
   * Reset current configuration and selected variatnts
   */
  check (context, { product, qty = 1 }) {
    return new Promise((resolve, reject) => {
      if (config.stock.synchronize) {
        context.dispatch('sync/queue', { url: config.stock.endpoint + '/check/' + encodeURIComponent(product.sku),
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
      } else {
        resolve({ qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'volatile' }) // if not online, cannot check the source of true here
      }
    })
  }
}

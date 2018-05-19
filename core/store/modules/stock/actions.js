import config from '../../lib/config'

export default {
  /**
   * Reset current configuration and selected variatnts
   */
  check (context, { product, qty = 1 }) {
    return new Promise((resolve, reject) => {
      if (config.stock.synchronize) {
        context.dispatch('sync/queue', { url: config.stock.endpoint + '/check?sku=' + encodeURIComponent(product.sku),
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          product_sku: product.sku,
          callback_event: 'stock-after-check'
        }, { root: true }).then(task => {
          resolve({ qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'ok', onlineCheckTaskId: task.task_id }) // if online we can return ok because it will be verified anyway
        })
      } else {
        resolve({ qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'volatile' }) // if not online, cannot check the source of true here
      }
    })
  },
  /**
   * Reset current configuration and selected variatnts
   */
  list (context, { skus }) {
    return new Promise((resolve, reject) => {
      if (config.stock.synchronize) {
        context.dispatch('sync/execute', { url: config.stock.endpoint + '/list?skus=' + encodeURIComponent(skus.join(',')),
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          skus: skus
        }, { root: true }).then(task => {
          if (task.resultCode === 200) {
            for (const si of task.result) {
              context.state.cache[si.product_id] = { is_in_stock: si.is_in_stock, qty: si.qty, product_id: si.product_id } // TODO: should be moved to mutation
            }
          }
          resolve(task) // if online we can return ok because it will be verified anyway
        }).catch((err) => {
          console.error(err)
          resolve(null)
        })
      } else {
        resolve(null) // if not online, cannot check the source of true here
      }
    })
  },
  clearCache (context) {
    context.state.cache = {}
  }
}

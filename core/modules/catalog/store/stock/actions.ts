import Vue from 'vue'
import { ActionTree } from 'vuex'
import i18n from '@vue-storefront/i18n'
// requires cart module
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types'
import RootState from '@vue-storefront/core/types/RootState'
import StockState from '../../types/StockState'
import { TaskQueue } from '@vue-storefront/core/lib/sync'
import { Logger } from '@vue-storefront/core/lib/logger'
import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers'

const actions: ActionTree<StockState, RootState> = {
  /**
   * Reset current configuration and selected variatnts
   */
  async queueCheck (context, { product, qty = 1 }) {
    if (config.stock.synchronize) {
      const task: any = await TaskQueue.queue({ url: processURLAddress(`${config.stock.endpoint}/check?sku=${encodeURIComponent(product.sku)}`),
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        is_result_cacheable: true, // store result for the Checkout.js double check
        product_sku: product.sku,
        callback_event: 'store:stock/stockAfterCheck'
      })
      return { qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'ok', onlineCheckTaskId: task.task_id } // if online we can return ok because it will be verified anyway
    } else {
      return { qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'volatile' } // if not online, cannot check the source of true here
    }
  },
  /**
   * Reset current configuration and selected variatnts
   */
  async check (context, { product, qty = 1 }) {
    if (config.stock.synchronize) {
      const task: any = TaskQueue.execute({ url: processURLAddress(`${config.stock.endpoint}/check?sku=${encodeURIComponent(product.sku)}`),
        payload: {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        product_sku: product.sku
      })
      return { qty: task.result ? task.result.qty : 0, status: task.result ? (task.result.is_in_stock ? 'ok' : 'out_of_stock') : 'ok', onlineCheckTaskId: task.task_id } // if online we can return ok because it will be verified anyway
    } else {
      return { qty: product.stock ? product.stock.qty : 0, status: product.stock ? (product.stock.is_in_stock ? 'ok' : 'out_of_stock') : 'volatile' } // if not online, cannot check the source of true here
    }
  },
  /**
   * Reset current configuration and selected variatnts
   */
  list (context, { skus }) {
    if (config.stock.synchronize) {
      try {
        const task: any = TaskQueue.execute({ url: processURLAddress(`${config.stock.endpoint}/list?skus=${encodeURIComponent(skus.join(','))}`),
          payload: {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
          },
          skus: skus
        })
        if (task.resultCode === 200) {
          for (const si of task.result) {
            context.state.cache[si.product_id] = { is_in_stock: si.is_in_stock, qty: si.qty, product_id: si.product_id } // TODO: should be moved to mutation
          }
        }
        return task // if online we can return ok because it will be verified anyway
      } catch (err) {
        Logger.error(err, 'stock')()
        return null
      }
    } else {
      return null // if not online, cannot check the source of true here
    }
  },
  clearCache (context) {
    context.state.cache = {}
  },
  async stockAfterCheck (context, event) {
    setTimeout(async () => {
      // TODO: Move to cart module
      const cartItem: any = await context.dispatch('cart/getItem', event.product_sku, { root: true })
      if (cartItem && event.result.code !== 'ENOTFOUND') {
        if (!event.result.is_in_stock) {
          if (!config.stock.allowOutOfStockInCart && !config.cart.synchronize) { // if config.cart.synchronize is true then - the items are being removed by the result of cart/update action executed from cart/sync
            Logger.log('Removing product from cart' + event.product_sku, 'stock')()
            context.commit('cart/' + types.CART_DEL_ITEM, { product: { sku: event.product_sku } }, {root: true})
          } else {
            context.dispatch('cart/updateItem', { product: { errors: { stock: i18n.t('Out of the stock!') }, sku: event.product_sku, is_in_stock: false } }, { root: true })
          }
        } else {
          context.dispatch('cart/updateItem', { product: { info: { stock: i18n.t('In stock!') }, sku: event.product_sku, is_in_stock: true } }, { root: true })
        }
        Vue.prototype.$bus.$emit('cart-after-itemchanged', { item: cartItem })
      }
      Logger.debug('Stock quantity checked for ' + event.result.product_id + ', response time: ' + (event.transmited_at - event.created_at) + ' ms', 'stock')()
      Logger.debug(event, 'stock')()
    }, 500)
  }
}

export default actions

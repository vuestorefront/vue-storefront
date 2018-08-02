import actions from './actions'
import store from '../../'
import EventBus from '../../lib/event-bus'
import * as types from '../../mutation-types'
import config from '../../lib/config'
import { i18n } from 'core/lib/i18n'

EventBus.$on('stock-after-check', (event) => { // example stock check callback
  setTimeout(() => {
    store.dispatch('cart/getItem', event.product_sku).then((cartItem) => {
      if (cartItem && event.result.code !== 'ENOTFOUND') {
        if (!event.result.is_in_stock) {
          if (!config.stock.allowOutOfStockInCart) {
            console.log('Removing product from the cart', event.product_sku)
            store.commit('cart/' + types.CART_DEL_ITEM, { product: { sku: event.product_sku } }, {root: true})
          } else {
            store.dispatch('cart/updateItem', { product: { errors: { stock: i18n.t('Out of the stock!') }, sku: event.product_sku, is_in_stock: false } })
          }
        } else {
          store.dispatch('cart/updateItem', { product: { info: { stock: i18n.t('In stock!') }, sku: event.product_sku, is_in_stock: true } })
        }
        EventBus.$emit('cart-after-itemchanged', { item: cartItem })
      }
    })
    console.debug('Stock quantity checked for ' + event.result.product_id + ', response time: ' + (event.transmited_at - event.created_at) + ' ms')
    console.debug(event)
  }, 500)
})

export default {
  namespaced: true,
  actions,
  state: {
    cache: {}
  }
}

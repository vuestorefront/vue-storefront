import actions from './actions'
import * as types from '../../mutation-types'
import config from 'config'

import rootStore from '../../'
const EventBus = rootStore.EventBus

EventBus.$on('stock-after-check', (event) => { // example stock check callback
  rootStore.dispatch('cart/getItem', event.product_sku).then((cartItem) => {
    if (cartItem && event.result.code !== 'ENOTFOUND') {
      if (!event.result.is_in_stock) {
        if (!config.stock.allowOutOfStockInCart) {
          console.log('Removing product from the cart', event.product_sku)
          rootStore.commit('cart/' + types.CART_DEL_ITEM, { product: { sku: event.product_sku } }, {root: true})
        } else {
          rootStore.dispatch('cart/updateItem', { product: { warning_message: 'Out of the stock!', sku: event.product_sku, is_in_stock: false } })
        }
      } else {
        rootStore.dispatch('cart/updateItem', { product: { info_message: 'In stock!', sku: event.product_sku, is_in_stock: true } })
      }
      EventBus.$emit('cart-after-itemchanged', { item: cartItem })
    }
  })
  console.log('Stock quantity checked for ' + event.result.product_id + ', qty = ' + event.result.qty + ', response time: ' + (event.transmited_at - event.created_at) + ' ms')
  console.log(event)
})

export default {
  namespaced: true,
  actions
}

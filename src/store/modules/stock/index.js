import actions from './actions'
import store from '../../'
import EventBus from 'src/plugins/event-bus'

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

export default {
  namespaced: true,
  actions
}

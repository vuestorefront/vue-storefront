import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import debounce from '../util/debounce'
import { EventAddToCart } from '../types/events'

export default (fbq, currency) => {
    let myDebounce:(Function | null) = null

    const track = (body: EventAddToCart) => {
      fbq('track', 'AddToCart', body)
    };

    // Product first time added to cart
    EventBus.$on('cart-before-add', product => {
        
      if(!myDebounce) {
        myDebounce = debounce(() => {
          const pr = product.product
          track({
            content_ids: pr.sku,
            content_name: pr.name,
            value: pr.priceInclTax * pr.qty,
            currency,
            content_type: 'product'
          })
        }, 1000)
      }
      myDebounce()
    })

    EventBus.$on('cart-before-itemchanged', product => {

      if(!myDebounce) {
        myDebounce = debounce(() => {
          const pr = product.item
          track({
            content_ids: pr.sku,
            content_name: pr.name,
            value: pr.priceInclTax * pr.qty,
            currency,
            content_type: 'product'
          })
        }, 1000)
      }
      if(myDebounce && product.item.qty > 1 && product.item.prev_qty < product.item.qty) {
        myDebounce()
      }
    })
}
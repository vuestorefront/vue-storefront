import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import { EventAddToWishlist } from '../types/events'

export default (fbq, currency) => {

    const track = (body: EventAddToWishlist) => {
      fbq('track', 'AddToWishlist', body)
    }

    EventBus.$on('wishlist-add-item', product => {
      track({
        content_ids: product.sku,
        content_name: product.name,
        value: product.priceInclTax * product.qty,
        currency,
        content_type: 'product'
      })
    })
}
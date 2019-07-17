import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus/index'
import { EventPurchase, CartItem } from '../types/events'

export default (fbq, currency) => {
    const isInt = n => Number(n) === n && n % 1 === 0

    const track = (body: EventPurchase) => {
      fbq('track', 'Purchase', body)
    }

    EventBus.$on('order-after-placed', payload => {
        const order = payload.order

        const content_ids: string[] = []
        const contents: CartItem[] = []
        let value: number = 0
        let num_items: number = 0

        order.products.forEach(item => {
          content_ids.push(item.sku)
          contents.push({
            'id': item.sku,
            'quantity': item.qty,
            'item_price': item.priceInclTax
          })
          const thePrice = (isInt(item.price) ? item.price : item.priceInclTax) * item.qty
          num_items += Number(item.qty)
          value += thePrice
        })

        track({
          value,
          currency,
          content_ids,
          content_type: 'product',
          contents,
          num_items
        })
    })
}
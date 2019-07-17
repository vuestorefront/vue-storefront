import { EventViewContent } from '../types/events'

export default (fbq, product, currency) => {
    const track = (body: EventViewContent) => {
        fbq('track', 'ViewContent', body)
    }

    track({
        content_ids: product.sku,
        content_name: product.name,
        content_type: 'product',
        currency,
        value: product.priceInclTax 
    })
    
}
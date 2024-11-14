import config from 'config'
import { Order } from '@vue-storefront/core/modules/order/types/Order'
import { OptimizedOrder } from '../types/OptimizedOrder'

const optimizeOrder = (order: Order): OptimizedOrder | Order => {
  if (config.entities.optimize && config.entities.optimizeShoppingCart) {
    return {
      ...order,
      products: order.products.map(product => ({
        server_item_id: product.server_item_id as number,
        sku: product.sku,
        qty: product.qty as number,
      })
      )
    }
  }

  return order
}

export default optimizeOrder

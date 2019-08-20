import config from 'config'
import omit from 'lodash-es/omit'
import { Order } from '@vue-storefront/core/modules/order/types/Order'

const optimizeOrder = (order: Order): Order => {
  if (config.entities.optimize && config.entities.optimizeShoppingCart) {
    return {
      ...order,
      products: order.products.map(product => omit(product, ['configurable_options', 'configurable_children'])) as Order['products']
    }
  }

  return order
}

export default optimizeOrder

import { Order } from '@vue-storefront/core/modules/order/types/Order'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const prepareOrder = (order: Order): Order => {
  const storeView = currentStoreView()
  const storeCode = storeView.storeCode ? storeView.storeCode : order.store_code

  return {
    ...order,
    store_code: storeCode
  }
}

export default prepareOrder

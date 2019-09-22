import { UserOrders } from '@vue-storefront/core/modules/order/components/UserOrders'

// component fully deprecated. Use user/components/Orders instead
export default {
  name: 'MyOrders',
  mixins: [UserOrders]
}

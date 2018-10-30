import { UserOrders } from '@vue-storefront/core/modules/user/components/Orders'

// component fully depreciated. Use user/components/Orders instead
export default {
  name: 'MyOrders',
  mixins: [UserOrders]
}

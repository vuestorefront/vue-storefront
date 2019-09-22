import { UserSingleOrder } from '@vue-storefront/core/modules/order/components/UserSingleOrder'

// Component deprecated, now in Order module
export default {
  name: 'MyOrder',
  mixins: [UserSingleOrder]
}

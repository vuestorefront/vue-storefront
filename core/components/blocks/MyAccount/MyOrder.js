import { UserSingleOrder } from '@vue-storefront/core/modules/order/components/UserSingleOrder'

// Component depreciated, now in Order module
export default {
  name: 'MyOrder',
  mixins: [UserSingleOrder]
}

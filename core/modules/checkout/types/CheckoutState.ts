import { Order } from '@vue-storefront/core/modules/order/types/Order'

import ShippingDetails from './ShippingDetails'
import PaymentDetails from './PaymentDetails'

export default interface CheckoutState {
  order: any,
  paymentMethods: any[],
  shippingMethods: any[],
  personalDetails: {
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    createAccount: boolean
  },
  shippingDetails: ShippingDetails,
  paymentDetails: PaymentDetails,
  modifiedAt: number,
  successOrderData: {
    order: Order,
    confirmation: any
  } | undefined
}

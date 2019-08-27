import ShippingDetails from './ShippingDetails'
import PaymentDetails from './PaymentDetails'

export default interface CheckoutState {
  order: any,
  personalDetails: {
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    createAccount: boolean
  },
  shippingDetails: ShippingDetails,
  paymentDetails: PaymentDetails,
  isThankYouPage: boolean,
  modifiedAt: number
}

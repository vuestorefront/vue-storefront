import BaseAddressDetails from './BaseAddressDetails';

export default interface PaymentDetails extends BaseAddressDetails {
  company: string,
  paymentMethod: string,
  paymentMethodAdditional: any
}

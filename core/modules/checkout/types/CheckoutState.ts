export default interface CheckoutState {
  order: any,
  personalDetails: {
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
    createAccount: boolean
  },
  shippingDetails: {
    firstName: string,
    lastName: string,
    country: string,
    streetAddress: string,
    apartmentNumber: string,
    city: string,
    state: string,
    region_id: number,
    zipCode: string,
    phoneNumber: string,
    shippingMethod: string
  },
  paymentDetails: {
    firstName: string,
    lastName: string,
    company: string,
    country: string,
    streetAddress: string,
    apartmentNumber: string,
    city: string,
    region_id: number,
    state: string,
    zipCode: string,
    phoneNumber: string,
    taxId: string,
    paymentMethod: string,
    paymentMethodAdditional: any
  },
  isThankYouPage: boolean
}

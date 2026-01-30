import PaymentDetails from '../types/PaymentDetails';

export default function getDefaultPaymentDetails (): PaymentDetails {
  return {
    firstName: '',
    lastName: '',
    company: '',
    country: '',
    streetAddress: '',
    apartmentNumber: '',
    city: '',
    state: '',
    region_id: null,
    zipCode: '',
    phoneNumber: '',
    vat_id: '',
    paymentMethod: '',
    paymentMethodAdditional: {}
  }
}

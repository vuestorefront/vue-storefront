export default interface PaymentDetails {
  firstName: string,
  lastName: string,
  company: string,
  country: string,
  streetAddress: string,
  apartmentNumber: string,
  city: string,
  region_id: number | null,
  state: string,
  zipCode: string,
  phoneNumber: string,
  vat_id: string,
  paymentMethod: string,
  paymentMethodAdditional: any
}

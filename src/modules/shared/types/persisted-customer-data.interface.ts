import { PersistedBillingAddress } from './persisted-billing-address.interface';

export interface PersistedCustomerData {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  shippingCountry: string,
  billingAddress: PersistedBillingAddress
}

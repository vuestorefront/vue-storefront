import { PersistedBillingAddress } from './persisted-billing-address.interface';

export interface StoreState {
  email: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  phoneNumber: string | undefined,
  shippingCountry: string | undefined,
  lastUsedCustomerBillingAddress: PersistedBillingAddress
}

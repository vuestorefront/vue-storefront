import { StoreState } from '../types/store-state.interface';

export const state: StoreState = {
  email: undefined,
  firstName: undefined,
  lastName: undefined,
  phoneNumber: undefined,
  shippingCountry: undefined,
  vatId: undefined,
  lastUsedCustomerBillingAddress: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
}

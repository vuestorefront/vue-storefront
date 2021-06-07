import { AddressFragment } from './address';

// TODO: Remove all address information and update PRO packages to use customQueries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
export const CustomerFragment = `
  ${AddressFragment}

  fragment DefaultCustomer on Customer {
    version
    firstName
    lastName
    email
    addresses {
      id
    }
    shippingAddresses {
      ...DefaultAddress
    }
    billingAddresses {
      ...DefaultAddress
    }
    defaultBillingAddressId
    defaultShippingAddressId
  }
`;

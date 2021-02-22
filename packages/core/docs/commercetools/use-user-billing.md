# `useUserBilling` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useUserBilling` composable can be used to:

* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `billing` property.

- `addAddress` - function for posting new billing address.

```typescript
interface BillingAddressAddParams {
  address: {
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    apartment: string;
    phone: string;
    isDefault?: boolean;
  }
}
```

- `deleteAddress` - function for deleting existing billing address.

```typescript
interface BillingAddressDeleteParams {
  address: {
    id: string;
  }
}
```

- `updateAddress` - function for updating existing billing address.

```typescript
interface BillingAddressUpdateParams {
  address: {
    id: string;
    firstName: string;
    lastName: string;
    streetName: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    apartment: string;
    phone: string;
    isDefault?: boolean;
  }
}
```

- `setDefaultAddress` - function for settings an existing billing address as default.

```typescript
interface BillingAddressSetDefaultParams {
  address: {
    id: string;
  }
}
```
- `billing` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefaultAddress` methods.

## Getters

- `getAddresses` - returns list of billing addresses.

- `getDefault` - returns a default billing address.

- `getTotal` - returns total number of billing addresses user has.

- `getId` - returns id from an individual address.

- `getPostCode` - returns post code from an individual address.

- `getStreetName` - returns street name from an individual address.

- `getStreetNumber` - returns street number from an individual address.

- `getCity` - returns city name from an individual address.

- `getFirstName` - returns first name from an individual address.

- `getLastName` - returns last name from an individual address.

- `getCountry` - returns country name from an individual address.

- `getPhone` - return phone number from an individual address.

- `getEmail` - returns e-mail address from an individual address.

- `getProvince` - returns province (state) from an individual address.

- `getCompanyName` - returns company name from an individual address.

- `getTaxNumber` - returns tax number from an individual address.

- `getApartmentNumber` - returns apartment number from an individual address.

- `isDefault` - return information if address is current default.

```typescript

interface UserBillingGetters {
  getAddresses: (billing: User, criteria?: Record<string, any>) => BillingAddress[];
  getDefault: (billing: User) => BillingAddress;
  getTotal: (billing: User) => number;
  getId: (address: BillingAddress) => string | number;
  getPostCode: (address: BillingAddress) => string;
  getStreetName: (address: BillingAddress) => string;
  getStreetNumber: (address: BillingAddress) => string | number;
  getCity: (address: BillingAddress) => string;
  getFirstName: (address: BillingAddress) => string;
  getLastName: (address: BillingAddress) => string;
  getCountry: (address: BillingAddress) => string;
  getPhone: (address: BillingAddress) => string;
  getEmail: (address: BillingAddress) => string;
  getProvince: (address: BillingAddress) => string;
  getCompanyName: (address: BillingAddress) => string;
  getTaxNumber: (address: BillingAddress) => string;
  getApartmentNumber: (address: BillingAddress) => string | number;
  isDefault: (address: BillingAddress) => boolean;
}

type Customer = Versioned & {
  __typename?: "Customer";
  customerNumber?: Maybe<Scalars["String"]>;
  email: Scalars["String"];
  password: Scalars["String"];
  addresses: Array<Address>;
  defaultShippingAddressId?: Maybe<Scalars["String"]>;
  defaultBillingAddressId?: Maybe<Scalars["String"]>;
  shippingAddressIds: Array<Scalars["String"]>;
  billingAddressIds: Array<Scalars["String"]>;
  isEmailVerified: Scalars["Boolean"];
  customerGroupRef?: Maybe<Reference>;
  externalId?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  middleName?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  locale?: Maybe<Scalars["Locale"]>;
  salutation?: Maybe<Scalars["String"]>;
  dateOfBirth?: Maybe<Scalars["Date"]>;
  companyName?: Maybe<Scalars["String"]>;
  vatId?: Maybe<Scalars["String"]>;
  customerGroup?: Maybe<CustomerGroup>;
  defaultShippingAddress?: Maybe<Address>;
  defaultBillingAddress?: Maybe<Address>;
  shippingAddresses: Array<Address>;
  billingAddresses: Array<Address>;
  storesRef: Array<KeyReference>;
  stores: Array<Store>;
  customFieldsRaw?: Maybe<Array<RawCustomField>>;
  customFields?: Maybe<Type>;
  custom?: Maybe<CustomFieldsType>;
  id: Scalars["String"];
  version: Scalars["Long"];
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  createdBy?: Maybe<Initiator>;
  lastModifiedBy?: Maybe<Initiator>;
  customFieldList?: Maybe<Array<CustomField>>;
}

type User = Customer;

type Address = {
  __typename?: "Address";
  id?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  salutation?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  streetName?: Maybe<Scalars["String"]>;
  streetNumber?: Maybe<Scalars["String"]>;
  additionalStreetInfo?: Maybe<Scalars["String"]>;
  postalCode?: Maybe<Scalars["String"]>;
  city?: Maybe<Scalars["String"]>;
  region?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  country: Scalars["Country"];
  company?: Maybe<Scalars["String"]>;
  department?: Maybe<Scalars["String"]>;
  building?: Maybe<Scalars["String"]>;
  apartment?: Maybe<Scalars["String"]>;
  pOBox?: Maybe<Scalars["String"]>;
  contactInfo: AddressContactInfo;
  additionalAddressInfo?: Maybe<Scalars["String"]>;
  externalId?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
}

type BillingAddress = Address & {
  isDefault?: boolean;
}
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserBilling, userBillingGetters } from '@vsf-enterprise/ct-billing';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserBilling();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
      userBillingGetters
    };
  }
};
```

Providing custom GraphQL query and variables:

```typescript
await addAddress(addParams, (query, variables) => ({ query, variables }));
await deleteAddress(deleteParams, (query, variables) => ({ query, variables }));
await updateAddress(updateParams, (query, variables) => ({ query, variables }));
```

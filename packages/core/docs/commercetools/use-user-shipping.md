# `useUserShipping` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useUserShipping` composable can be used to:

* fetch existing shipping addresses,
* submit new shipping addresses,
* modify and delete existing shipping addresses.

## API

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `shipping` property.

- `addAddress` - function for posting new shipping address.

```typescript
interface ShippingAddressAddParams {
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

- `deleteAddress` - function for deleting existing shipping address.

```typescript
interface ShippingAddressDeleteParams {
  address: {
    id: string;
  }
}
```

- `updateAddress` - function for updating existing shipping address.

```typescript
interface ShippingAddressUpdateParams {
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

- `setDefaultAddress` - function for settings an existing shipping address as default.

```typescript
interface ShippingAddressSetDefaultParams {
  address: {
    id: string;
  }
}
```

- `shipping` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefaultAddress` methods.

## Getters

- `getAddresses` - returns list of shipping addresses.

- `getDefault` - returns a default shipping address.

- `getTotal` - returns total number of shipping addresses user has.

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
interface UserShippingGetters {
  getAddresses: (shipping: User, criteria?: Record<string, any>) => ShippingAddress[];
  getDefault: (shipping: User) => ShippingAddress;
  getTotal: (shipping: User) => number;
  getId: (address: ShippingAddress) => string | number;
  getPostCode: (address: ShippingAddress) => string;
  getStreetName: (address: ShippingAddress) => string;
  getStreetNumber: (address: ShippingAddress) => string | number;
  getCity: (address: ShippingAddress) => string;
  getFirstName: (address: ShippingAddress) => string;
  getLastName: (address: ShippingAddress) => string;
  getCountry: (address: ShippingAddress) => string;
  getPhone: (address: ShippingAddress) => string;
  getEmail: (address: ShippingAddress) => string;
  getProvince: (address: ShippingAddress) => string;
  getCompanyName: (address: ShippingAddress) => string;
  getTaxNumber: (address: ShippingAddress) => string;
  getApartmentNumber: (address: ShippingAddress) => string | number;
  isDefault: (address: ShippingAddress) => boolean;
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

type ShippingAddress = Address & {
  isDefault?: boolean;
}
```

## Example

```typescript
import { onSSR } from '@vue-storefront/core';
import { useUserShipping, userShippingGetters } from '@vsf-enterprise/ct-shipping';

export default {
  setup() {
    const {
      shipping,
      load,
      addAddress,
      deleteAddress,
      updateAddress
    } = useUserShipping();

    // If you're using Nuxt or any other framework for Universal Vue apps
    onSSR(async () => {
      await load();
    });

    return {
      shipping: computed(() => userShippingGetters.getAddresses(shipping.value)),
      userShippingGetters
    };
  }
};
```

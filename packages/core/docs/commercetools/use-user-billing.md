# `useUserBilling` <Badge text="Enterprise" type="info" />

> This feature is a part of our commercial offering and does not exist in Open Source version of commercetools integration. Read more about a Vue Storefront Enterprise Cloud [here](https://www.vuestorefront.io/cloud)

## Features

`useUserBilling` composable can be used to:

* fetch existing billing addresses,
* submit new billing addresses,
* modify and delete existing billing addresses.

## API

`useUserBilling` contains following properties:

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `billing` property.

- `addAddress` - function for posting new billing address.

<Content slot-key="add-params" />

- `deleteAddress` - function for deleting existing billing address.

<Content slot-key="delete-params" />

- `updateAddress` - function for updating existing billing address.

<Content slot-key="update-params" />

- `setDefaultAddress` - function for settings an existing billing address as default.

<Content slot-key="set-default-params" />

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

Interface for the above getter looks like this:

```typescript

interface UserBillingGetters {
  getAddresses: (billing, criteria?: Record<string, any>) => [];
  getDefault: (billing) => any;
  getTotal: (billing) => number;
  getId: (address) => string | number;
  getPostCode: (address) => string;
  getStreetName: (address) => string;
  getStreetNumber: (address) => string | number;
  getCity: (address) => string;
  getFirstName: (address) => string;
  getLastName: (address) => string;
  getCountry: (address) => string;
  getPhone: (address) => string;
  getEmail: (address) => string;
  getProvince: (address) => string;
  getCompanyName: (address) => string;
  getTaxNumber: (address) => string;
  getApartmentNumber: (address) => string | number;
  isDefault: (address) => boolean;
}
```

## Example

Fetching billing addresses for currently logged-in user:

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

<!---------------------------------------------------- SLOTS ---------------------------------------------------->

<!---------------------- SLOT: add-params ---------------------->
::: slot add-params

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

:::

<!---------------------- SLOT: delete-params ---------------------->
::: slot delete-params

```typescript
interface BillingAddressDeleteParams {
  address: {
    id: string;
  }
}
```

:::

<!---------------------- SLOT: update-params ---------------------->
::: slot update-params

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

:::

<!---------------------- SLOT: set-default-params ---------------------->
::: slot set-default-params

```typescript
interface BillingAddressSetDefaultParams {
  address: {
    id: string;
  }
}
```

:::

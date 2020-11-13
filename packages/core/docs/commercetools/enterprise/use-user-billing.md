---
platform: Commercetools
---

# Billing address

[[toc]]

## Features

`useUserBilling` composition function can be used to:

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

- `setDefault` - function for settings an existing billing address as default.

::: tip
If `isDefault` property is passed to `addAddress` or `updateAddress`, there is no need to call `setDefault` separately.
:::

<Content slot-key="set-default-params" />

- `billing` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefault` methods.

## Getters

Because `billing` property is a raw response, it's recommended to use `UserBillingGetters` for accessing any data from it. It includes following helper functions:

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

export interface UserBillingGetters<USER_BILLING, USER_BILLING_ITEM> {
  // Getters for 'billing' data object
  getAddresses: (billing: USER_BILLING, criteria?: Record<string, any>) => USER_BILLING_ITEM[];
  getDefault: (billing: USER_BILLING) => USER_BILLING_ITEM;
  getTotal: (billing: USER_BILLING) => number;

  // Getters for individual addresses
  getId: (address: USER_BILLING_ITEM) => string | number;
  getPostCode: (address: USER_BILLING_ITEM) => string;
  getStreetName: (address: USER_BILLING_ITEM) => string;
  getStreetNumber: (address: USER_BILLING_ITEM) => string | number;
  getCity: (address: USER_BILLING_ITEM) => string;
  getFirstName: (address: USER_BILLING_ITEM) => string;
  getLastName: (address: USER_BILLING_ITEM) => string;
  getCountry: (address: USER_BILLING_ITEM) => string;
  getPhone: (address: USER_BILLING_ITEM) => string;
  getEmail: (address: USER_BILLING_ITEM) => string;
  getProvince: (address: USER_BILLING_ITEM) => string;
  getCompanyName: (address: USER_BILLING_ITEM) => string;
  getTaxNumber: (address: USER_BILLING_ITEM) => string;
  getApartmentNumber: (address: USER_BILLING_ITEM) => string | number;
  isDefault: (address: USER_BILLING_ITEM) => boolean;
}
```

## Usage

When you already installed `@vsf-enterprise/ct-billing` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-billing` to `build > traspile` array in `nuxt.config.js`:

```javascript
{
    build: {
      transpile: [
        '@vsf-enterprise/ct-billing'
      ]
    }
}
```

Then we need to replace the import of `useUserBilling` and `userBillingGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-billing`:

```javascript
// Before
import { /* other imports */, useUserBilling, userBillingGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useUserBilling, userBillingGetters } from '@vsf-enterprise/ct-billing';
```

## Examples

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
await setDefault(setDefaultParams, (query, variables) => ({ query, variables }));
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

---
platform: Commercetools
---

# Shipping addresses

[[toc]]

## Features

`useUserShipping` composition function can be used to:

* fetch existing shipping addresses,
* submit new shipping addresses,
* modify and delete existing shipping addresses.

## API

`useUserShipping` contains following properties:

- `load` - function for fetching user addresses. When invoked, it requests data from the API and populates `shipping` property.

- `addAddress` - function for posting new shipping address.

<Content slot-key="add-params" />

- `deleteAddress` - function for deleting existing shipping address.

<Content slot-key="delete-params" />

- `updateAddress` - function for updating existing shipping address.

<Content slot-key="update-params" />

- `setDefaultAddress` - function for settings an existing shipping address as default.

::: tip
If `isDefault` property is passed to `addAddress` or `updateAddress`, there is no need to call `setDefaultAddress` separately.
:::

<Content slot-key="set-default-params" />

- `shipping` - reactive data object containing response from the backend.

- `loading` - reactive object containing information about loading state of `load`, `addAddress`, `deleteAddress`, `updateAddress` and `setDefaultAddress` methods.

## Getters

Because `shipping` property is a raw response, it's recommended to use `UserShippingGetters` for accessing any data from it. It includes following helper functions:

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

Interface for the above getter looks like this:

```typescript

export interface UserShippingGetters<USER_SHIPPING, USER_SHIPPING_ITEM> {
  // Getters for 'shipping' data object
  getAddresses: (shipping: USER_SHIPPING, criteria?: Record<string, any>) => USER_SHIPPING_ITEM[];
  getDefault: (shipping: USER_SHIPPING) => USER_SHIPPING_ITEM;
  getTotal: (shipping: USER_SHIPPING) => number;

  // Getters for individual addresses
  getId: (address: USER_SHIPPING_ITEM) => string | number;
  getPostCode: (address: USER_SHIPPING_ITEM) => string;
  getStreetName: (address: USER_SHIPPING_ITEM) => string;
  getStreetNumber: (address: USER_SHIPPING_ITEM) => string | number;
  getCity: (address: USER_SHIPPING_ITEM) => string;
  getFirstName: (address: USER_SHIPPING_ITEM) => string;
  getLastName: (address: USER_SHIPPING_ITEM) => string;
  getCountry: (address: USER_SHIPPING_ITEM) => string;
  getPhone: (address: USER_SHIPPING_ITEM) => string;
  getEmail: (address: USER_SHIPPING_ITEM) => string;
  getProvince: (address: USER_SHIPPING_ITEM) => string;
  getCompanyName: (address: USER_SHIPPING_ITEM) => string;
  getTaxNumber: (address: USER_SHIPPING_ITEM) => string;
  getApartmentNumber: (address: USER_SHIPPING_ITEM) => string | number;
  isDefault: (address: USER_SHIPPING_ITEM) => boolean;
}
```

## Usage

When you already installed `@vsf-enterprise/ct-shipping` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-shipping` to `build > traspile` array in `nuxt.config.js`:

```javascript
{
    build: {
      transpile: [
        '@vsf-enterprise/ct-shipping'
      ]
    }
}
```

Then we need to replace the import of `useUserShipping` and `userShippingGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-shipping`:

```javascript
// Before
import { /* other imports */, useUserShipping, userShippingGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useUserShipping, userShippingGetters } from '@vsf-enterprise/ct-shipping';
```

## Examples

Fetching shipping addresses for currently logged-in user:

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

:::

<!---------------------- SLOT: delete-params ---------------------->
::: slot delete-params

```typescript
interface ShippingAddressDeleteParams {
  address: {
    id: string;
  }
}
```

:::

<!---------------------- SLOT: update-params ---------------------->
::: slot update-params

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

:::

<!---------------------- SLOT: set-default-params ---------------------->
::: slot set-default-params

```typescript
interface ShippingAddressSetDefaultParams {
  address: {
    id: string;
  }
}
```

:::

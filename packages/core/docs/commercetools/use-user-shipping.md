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

<Content slot-key="add-params" />

- `deleteAddress` - function for deleting existing shipping address.

<Content slot-key="delete-params" />

- `updateAddress` - function for updating existing shipping address.

<Content slot-key="update-params" />

- `setDefaultAddress` - function for settings an existing shipping address as default.

<Content slot-key="set-default-params" />

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
  getAddresses: (shipping, criteria?: Record<string, any>) => [];
  getDefault: (shipping) => any;
  getTotal: (shipping) => number;
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

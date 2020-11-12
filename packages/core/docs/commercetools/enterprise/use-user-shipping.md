---
platform: Commercetools
---

# Shipping addresses

[[toc]]

## Features

<IncludeContent content-key="useUserShipping/features" />

## API

<IncludeContent content-key="useUserShipping/api" />

## Getters

<IncludeContent content-key="useUserShipping/getters" />

## Usage

When you already installed `@vsf-enterprise/ct-shipping` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-shipping` to `build > traspile` array in `nuxt.config.js`.

Then we need to replace the import of `useUserShipping` and `userShippingGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-shipping`:

```javascript
// Before
import { /* other imports */, useUserShipping, userShippingGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useUserShipping, userShippingGetters } from '@vsf-enterprise/ct-shipping';
```

## Examples

<IncludeContent content-key="useUserShipping/examples" />

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

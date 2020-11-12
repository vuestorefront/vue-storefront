---
platform: Commercetools
---

# Billing address

[[toc]]

## Features

<IncludeContent content-key="useUserBilling/features" />

## API

<IncludeContent content-key="useUserBilling/api" />

## Getters

<IncludeContent content-key="useUserBilling/getters" />

## Usage

When you already installed `@vsf-enterprise/ct-billing` as a dependency, there are few minor modifications required to make it work.

The first step is to add `@vsf-enterprise/ct-billing` to `build > traspile` array in `nuxt.config.js`.

Then we need to replace the import of `useUserBilling` and `userBillingGetters` everywhere they are used from `@vue-storefront/commercetools` to `@vsf-enterprise/ct-billing`:

```javascript
// Before
import { /* other imports */, useUserBilling, userBillingGetters } from '@vue-storefront/commercetools';

// After
import { /* other imports */ } from '@vue-storefront/commercetools';
import { useUserBilling, userBillingGetters } from '@vsf-enterprise/ct-billing';
```

## Examples

<IncludeContent content-key="useUserBilling/examples" />

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

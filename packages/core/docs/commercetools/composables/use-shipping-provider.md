# `useShippingProvider`

## Features

`useShippingProvider` composable can be use to:

* Loading shipping methods for the current cart.
* Selecting shipping method for the current cart.

## API

- `load` - function for fetching shipping method. When invoked, it requests data from the API and populates `response` key inside `state` property. This method accepts a single optional `params` object. The `params` has the following option:

    - `customQuery?: CustomQuery`

- `save` - function for selecting shipping method. This method accepts a single `saveParams` object. The `saveParams` has the following options:

    - `shippingMethod: ShippingMethod`

    - `customQuery?: CustomQuery`

```ts
type ShippingMethod = Versioned & {
  __typename?: "ShippingMethod";
  id: Scalars["String"];
  version: Scalars["Long"];
  name: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  zoneRates: Array<ZoneRate>;
  isDefault: Scalars["Boolean"];
  predicate?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  lastModifiedAt: Scalars["DateTime"];
  key?: Maybe<Scalars["String"]>;
  lastModifiedBy?: Maybe<Initiator>;
  createdBy?: Maybe<Initiator>;
  taxCategoryRef?: Maybe<Reference>;
  taxCategory?: Maybe<TaxCategory>;
};

type CustomQuery = Record<string, string>
```
- `state: ShippingProviderState` - a main data object that contains a shipping method
```ts
interface ShippingProviderState {
  response: ShippingInfo
}

type ShippingInfo = {
  __typename?: "ShippingInfo";
  shippingMethodName: Scalars["String"];
  price: Money;
  shippingRate: ShippingRate;
  taxRate?: Maybe<TaxRate>;
  taxCategory?: Maybe<Reference>;
  deliveries: Array<Delivery>;
  discountedPrice?: Maybe<DiscountedLineItemPrice>;
  taxedPrice?: Maybe<TaxedItemPrice>;
  shippingMethodState: ShippingMethodState;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingMethodRef?: Maybe<Reference>;
};
```

- `loading: boolean` - a reactive object containing information about loading state of your `load` or `save` method.

- `error: UseShippingProviderErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseShippingProviderErrors {
  load?: Error;
  save?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useShippingProvider } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  setup () {
    const { load, state } = useShippingProvider();

    onSSR(async () => {
      await load();
    });
    
    return {
      selectedShippingMethod: computed(() => state.value && state.value.response)
    };
  }
}
```

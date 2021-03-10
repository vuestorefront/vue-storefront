# `useBilling`

## Features

`useBilling` composable can be use to:

* Loading billing address for the current cart.
* Saving billing address for the current cart.

## API

- `load` - function for fetching billing address. When invoked, it requests data from the API and populates `billing` property. This method accepts a single optional `params` object. The `params` has the following option:

    - `customQuery?: CustomQuery`

- `save` - function for saving billing address. This method accepts a single `saveParams` object. The `saveParams` has the following options:

    - `billingDetails: Address`

    - `customQuery?: CustomQuery`

```ts
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
  phone?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  additionalAddressInfo?: Maybe<Scalars["String"]>;
  externalId?: Maybe<Scalars["String"]>;
  key?: Maybe<Scalars["String"]>;
};
type CustomQuery = Record<string, string>
```
- `billing: Address` - a main data object that contains a billing address.
- `loading: boolean` - a reactive object containing information about loading state of your `load` or `save` method.
- `error: UseBillingErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.
```ts
interface UseBillingErrors {
  load?: Error;
  save?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useBilling } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core'
export default {
  setup () {
    const { load, billing } = useBilling();
    onSSR(async () => {
      await load();
    });
    return {
      billing
    };
  }
}
```

# `useStore` <Badge text="Added in 1.3" type="info" />

## Features

`useStore` composable can be used for:

* Loading available stores with related channels.
* Change and save selected store / channel.

## API

- `load` - function for fetching stores data. When invoked, it requests data from the API and populates `response` property. This method accepts a single optional `params` object. The `params` has the following option:

    - `customQuery?: CustomQuery`
  
      ```ts
      type CustomQuery = {
        [key: string]: string
      }
      ```

- `change` - function for changing and saving selected store / channel. This method accepts a single params object. The params has the following options:

    - `currentStore: AgnosticStore`

    - `store: AgnosticStore`

    - `customQuery?: CustomQuery`

      ```ts
      interface AgnosticStore {
        name: string;
        id: string;
        description?: string;
        locales?: AgnosticLocale[];
        currencies?: AgnosticCurrency[]
        address?: AgnosticAddress;
        geoLocation?: AgnosticGeoLocation;
        [x: string]: unknown;
      }
      ```

- `response` - a main data object that contains loaded stores data.

  ```ts
  type StoreQueryResult = {
    offset: Scalars["Int"];
    count: Scalars["Int"];
    total: Scalars["Long"];
    results: Array<Store>;
  };

  export type Store = {
    id: Scalars["String"];
    version: Scalars["Long"];
    key: Scalars["String"];
    name?: Maybe<Scalars["String"]>;
    nameAllLocales?: Maybe<Array<LocalizedString>>;
    languages?: Maybe<Array<Scalars["Locale"]>>;
    createdAt: Scalars["DateTime"];
    lastModifiedAt: Scalars["DateTime"];
    createdBy?: Maybe<Initiator>;
    lastModifiedBy?: Maybe<Initiator>;
    distributionChannels: Array<Channel>;
    supplyChannels: Array<Channel>;
  };
  ```

- `loading: boolean` - a reactive object containing information about loading state of your `load` method.

- `error: UseShippingErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

  ```ts
  export interface UseStoreErrors {
    load: Error | null;
    change: Error | null;
  }
  ```

## Getters

`storeGetter` object contains following methods:

- `getItems` - returns list of stores as `AgnosticStore` array.

- `getSelected` - returns selected store as `AgnosticStore`.


Related references:
  - [storeGetter](/commercetools/api-reference/commercetools.storegetters.html)
  - [UseStoreGetters](/reference/api/core.usestoregetters.html)
  - [StoresData](/commercetools/api-reference/commercetools.storesdata.html)

  ```typescript
  export interface useStoreGetters {
    getItems(stores: StoresData, criteria?: CRITERIA): AgnosticStore[];
    getSelected(stores: StoresData): AgnosticStore | undefined
  }

  export interface StoresData extends StoreQueryResult {
    _selectedStore: string;
  }

  export type StoreQueryResult = {
    __typename?: "StoreQueryResult";
    offset: Scalars["Int"];
    count: Scalars["Int"];
    total: Scalars["Long"];
    results: Array<Store>;
  }

  export interface AgnosticStore {
    name: string;
    id: string;
    description?: string;
    locales?: AgnosticLocale[];
    currencies?: AgnosticCurrency[]
    address?: AgnosticAddress;
    geoLocation?: AgnosticGeoLocation;
    [x: string]: unknown;
  }

  export interface AgnosticLocale {
    code: string;
    label: string;
    [x: string]: unknown;
  }

  export interface AgnosticCurrency {
    code: string;
    label: string;
    prefixSign: boolean;
    sign: string;
    [x: string]: unknown;
  }

  export interface AgnosticAddress {
    addressLine1: string;
    addressLine2: string;
    [x: string]: unknown;
  }

  export interface AgnosticGeoLocation {
    type: string;
    coordinates?: unknown;
    [x: string]: unknown;
  }
  ```

## Example

```js
import { useStore, storeGetters } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';

export default {
  setup () {
    const { load, response } = useStore();

    onSSR(async () => {
      await load();
    });

    return {
      stores: storesGetters.getItems(response.value),
      sselectedStore: storesGetters.getSelected(response.value)
    };
  }
}
```

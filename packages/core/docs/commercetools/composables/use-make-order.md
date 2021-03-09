# `useMakeOrder`

## Features

`useMakeOrder` composable is responsible for making an order 

## API

- `make` - function for making an order. This method accepts a single optional `params` object. The `params` has the following option:
 
    - `customQuery?: CustomQuery`

```ts
type CustomQuery = Record<string, string>
```

- `order: Order` - a main data object that contains a made order.

- `loading: boolean` - a reactive object containing information about loading state of your `make` method.

- `error: UseMakeOrderErrors` - a reactive object containing the error message, if `load` or `save` failed for any reason.

```ts
interface UseMakeOrderErrors {
  make?: Error;
}
```

## Getters

We do not provide getters for checkout and its parts.

## Example

```js
import { useMakeOrder } from '@vue-storefront/commercetools';

export default {
  setup () {
    const { make, order } = useMakeOrder();

    return {
      make,
      order
    };
  }
}
```

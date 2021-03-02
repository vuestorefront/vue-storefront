# `useShipping`

`useShipping` is a composable used for a Checkout process.

## When to use it?

Use `useShipping` composable when you want to save shipping address on the server or load it from there.

## How to use it in your project?

```js
import { useShipping } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      load,
      save,
      shipping
    } = useShipping();

    onSSR(async () => {
      await load();
    });

    return {
      shipping,
      save
    };
  }
};
```
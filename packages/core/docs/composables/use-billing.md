# `useBilling`

`useBilling` is a composable used for a Checkout process.

## When to use it?

Use `useBilling` composable when you want to save billing address on the server or load it from there.

## How to use it in your project?

```js
import { useBilling } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      load,
      save,
      billing
    } = useBilling();

    onSSR(async () => {
      await load();
    });

    return {
      billing,
      save
    };
  }
};
```
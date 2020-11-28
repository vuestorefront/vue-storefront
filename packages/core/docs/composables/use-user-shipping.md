# `useUserShipping`

## When to use it?

Use `useUserShipping` to:

- fetch list of shipping addresses for a particular user
- change default shipping address
- add/remove shipping addresses

## How to use it in your project?

```js
import { useUserShipping, userShippingGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      shipping,
      load,
      addAddress,
      deleteAddress,
      updateAddress,
      setDefault
    } = useUserShipping();

    onSSR(async () => {
      await load();
    });

    return {
      // extract a list of addresses from a `shipping` object
      shipping: computed(() => userShippingGetters.getAddresses(shipping.value)),
    };
  }
};
```
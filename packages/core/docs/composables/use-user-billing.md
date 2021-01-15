# `useUserBilling`

## When to use it?

Use `useUserBilling` to:

- fetch list of billing addresses for a particular user
- change default billing address
- add/remove billing addresses

## How to use it in your project?

```js
import { useUserBilling, userBillingGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      billing,
      load,
      addAddress,
      deleteAddress,
      updateAddress,
      setDefault
    } = useUserBilling();

    onSSR(async () => {
      await load();
    });

    return {
      // extract a list of addresses from a `billing` object
      billing: computed(() => userBillingGetters.getAddresses(billing.value)),
    };
  }
};
```
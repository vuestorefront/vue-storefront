# `useUserOrders`

## When to use it?

Use `useUserOrders` to fetch the list of orders for a particular user.


## How to use it in your project?

```js
import { useUserOrders, orderGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const {
      orders,
      search,
      loading,
      error
    } = useUserOrders();

    onSSR(async () => {
      await search();
    });

    return {
      // extract a list of orders from a `orders` object
      orders: computed(() => orderGetters.getItems(shipping.value)),
    };
  }
};
```
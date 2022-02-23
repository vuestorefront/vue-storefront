# Getters

> The getters are closely connected to the composables. If you are not already familiar with the concept, please refer to the composables chapter first.

## What are getters?

Getters are functions that are used to get the data from the raw API responses. They return agnostic or primitive types and allow you to write the same code regardless of the backend used.
Each composable has its own dedicated getter, e.g., `useCart` and `cartGetters`. **You should only use getters dedicated to specific composable**.

## When should I use them?

**Getters should be used whenever possible to extract the data from composables**, e.g., when you want to get the quantity of the products in the cart in UI components.

## How can I use getters?

The getters accept arguments to get the data. As an example, we will use cart functionalities.
Most functions in `cartGetters` accept whole `cart` objects or individual cart items. This data needs to be extracted from `useCart` composable first.
As the first example, we will use `getTotalItems` from `cartGetters` to get the total number of items in the cart.

```vue
<template>
  <div>
    <!-- ... -->
    <span>
      {{ cartTotalItems }}
    </span>
  </div>
</template>

<script>
import { computed } from '@nuxtjs/composition-api';
import { useCart, cartGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { cart, load } = useCart();
    const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value);

    onSSR(async () => {
      await load();
    });

    return {
      cart,
      cartTotalItems,
    };
  }
}
</script>
```

**It's important to use getters as the computed property** to have them always updated:

```vue
<script>
  import {  cartGetters } from '{INTEGRATION}';
  export default {
    setup() {
    
     // Don't do this, because you lose reactivity
      const nonReactive = cartGetters.getTotalItems(cart.value);
      
      // Do this instead
       const reactive = computed(() => cartGetters.getTotalItems(cart.value);
    };
  }
</script>
```

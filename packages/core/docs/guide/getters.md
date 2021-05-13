# Getters

> The getters are closely connected to the composables. If you are not already familiar with the concept, please refer to the composables chapter first.

## What are getters?

Getters are functions that allow you to get the data from the raw API responses. They return an agnostic or a primitive type. They allow you to write the same code regardless of the backend used.
Each composable has its own dedicated getter, e.g. `useCart` and `cartGetters`. **You should only use getters dedicated to specific composable**.

## When should I use them?

**Getters should be used whenever possible to extract the data from composables**, e.g., when you want to get the quantity of the products in the cart in UI components.

## How can I use getters?

The getters accept arguments to get the data. As an example, we will use cart functionalities.
Most functions in `cartGetters` accept whole `cart` object or individual cart items. This data needs to be extracted from `useCart` composable first.
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
import { computed } from '@vue/composition-api';
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
<!-- don't do this: -->
<script>
//...
  export default {
    setup() {
      const cartTotalItems = cartGetters.getTotalItems(cart.value);
      return {
        cartTotalItems
      };
    };
  }
</script>
```

```vue
<!-- instead do this: -->
<script>
//...
  import { computed } from '@vue/composition-api';
  export default {
    setup() {
      const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value);

      return {
        cartTotalItems,
      };
    }
  }
</script>
```

You can also use getters in template like so:

```vue
<!-- or this: -->
<template>
  <!-- ... -->
  <span>
    {{ cartGetters.getTotalItems(cart) }}
  </span>
</template>
<script>
//...
export default {
  setup() {
    const { cart, load } = useCart();

    onSSR(async () => {
      await load();
    });

    return {
      cart,
      cartGetters
    };
  }
};
</script>
```

## Available Getters

List of all available getters:

### productGetters

composable: useProduct

[productGetters](#)

### cartGetters

composable: useCart

[cartGetters](#)

### wishlistGetters

composable: useWishlist

[wishlistGetters](#)

### categoryGetters

composable: useCategory

[categoryGetters](#)

### userGetters

composable: useUser

[userGetters](#)

### userShippingGetters

composable: useUserShipping

[userShippingGetters](#)

### userBillingGetters

composable: useUserBilling

[userBillingGetters](#)

### userOrderGetters

composable: useUserOrder

[userOrderGetters](#)

### reviewGetters

composable: useReview

[reviewGetters](#)

### facetsGetters

composable: useFacet

[facetGetters](#)

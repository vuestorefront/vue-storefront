# Cart

Customer's cart can be loaded using `useCart` composable and data can be accessed using `cartGetters`.

## Loading and creating the cart

The `load` method will load your cart from the server or create a new one if it doesn't exist. The `cart` object will be `null` until you load it.


```js
import { useCart } from '@vue-storefront/commercetools';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const {
      cart,
      load
    } = useCart();

    onSSR(async () => {
      await load();
    });

    return {
      cart,
      load
    };
  }
};   
```


## Adding item to the cart

To add the product to the cart you can use `addItem` method:

```vue
<template>
  // ...
    <ul>
      <li
        v-for="product in products" :key="product.id"
      > 
        // ...
        <button
          @click="addItem({ product, quantity })"
        >
          Add to cart
        </button>
      </li>
    </ul>
  // ...
</template>    
<script>     
  import { computed } from '@nuxtjs/composition-api';
  import { useCart } from '@vue-storefront/commercetools';
  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const {
        addItem,
      } = useCart();

      // load cart if it wasn't loaded before

      return {
        addItem,
      };
    }
  };
</script>
``` 

## Removing items and changing their quantity

To remove an item from the cart use `removeItem` method, and similarly to update quantity use `updateItemQty` method:

```vue
<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">
        <input type="number" />
        <button @click="updateItemQty({ product, quantity })">
          Change quantity
        </button>
        <button @click="removeItem({ product })">
          Remove product
        </button>
      </li>
    </ul>
    <span>
      {{ totals.total }}
    </span>
    <span>
      {{ totalItems }}
    </span>
  </div>
</template>   

<script>
  import { computed } from '@nuxtjs/composition-api';
  import { useCart, cartGetters } from '@vue-storefront/commercetools';
  import { onSSR } from '@vue-storefront/core';

  export default {
    setup() {
      const {
        cart,
        removeItem, 
        updateItemQty,
        loading
      } = useCart();

      // load cart if it wasn't loaded before

      const products = computed(() => cartGetters.getItems(cart.value);
      const totals = computed(() => cartGetters.getTotals(cart.value));
      const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

      return {
        products,
        totals,
        totalItems,
        removeItem, 
        updateItemQty,
        loading
      };
    }
  };
</script>
```

## Checking if an item is in the cart

To check if a specific product configuration is already in the cart, pass it to `isInCart` method:

```js
import { computed } from '@nuxtjs/composition-api';
import { useCart } from '@vue-storefront/commercetools';

export default {
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  setup() {
    const { isInCart } = useCart();

    return {
      isInCart 
    };
  }
};
</script>
```

## Removing all cart items at once

To clear cart items (not delete it) use `clear` method.

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
        >
          // ...
        </li>
      <ul>
      <button
        @click="clear"
      >
        Clear cart
      </button>
    </div>
  // ...
</template>   
<script>      
  import { computed } from '@nuxtjs/composition-api';
  import { useCart, cartGetters } from '@vue-storefront/commercetools';

  export default {
    setup() {
      const {
        cart,
        clear, 
      } = useCart();
      const products = computed(() => cartGetters.getItems(cart.value));

      return {
        products,
        clear 
      };
    }
  };
</script>
```


## Applying and removing discount coupons

You can apply promotional coupons to your cart with `applyCoupon` and remove with `removeCoupon` method:

```vue
<template>
  // ...
    <div>
      <input />
      <button 
        @click="() => applyCoupon({ couponCode: promoCode })"
      >
        Use promo code
      </button>
      <button 
        @click="() => removeCoupon({ couponCode: promoCode })"
      >
        Remove promo code
      </button>
    </div>
  // ...
</template>   
<script>      
  import { useCart } from '@vue-storefront/commercetools';
  export default {
    setup() {
      const {
        applyCoupon, 
        removeCoupon
      } = useCart();

      return {
        applyCoupon,
        removeCoupon
      };
    }
  };
</script>
```

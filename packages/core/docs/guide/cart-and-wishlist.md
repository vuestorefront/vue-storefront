# Cart and wishlist

Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`.

## Loading and creating the cart

The `load` method will load your cart from the server or create a new one if it doesn't exist. The `cart` object will be `null` until you load it.

```js
import { useCart } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const { cart, load } = useCart();

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
  <!-- ... -->
  <ul>
    <li v-for="product in products" :key="productGetters.getId(product)">
      <!-- ... -->
      <input type="number" v-model="quantity" />
      <button @click="addItem({ product, quantity })">
        Add to cart
      </button>
    </li>
  </ul>
  <!-- ... -->
</template>
<script>
import { ref, computed } from '@vue/composition-api';
import { useCart, useFacet, productGetters, facetGetters } from '{INTEGRATION}';

export default {  
  setup() {
    const { addItem } = useCart();
    const { result } = useFacet();

    // TODO: load cart if it wasn't loaded before
    const quantity = ref(1);
    const products = computed(() => facetGetters.getProducts(result.value));

    return {
      addItem,
      quantity,
      productGetters,
      products
    };
  }
};
</script>
```

## Removing items and changing their quantity

To remove an item from the cart use `removeItem` method, and similarly to update quantity use `updateItemQty` method:

```vue
<template>
  <!-- ... -->
  <div>
    <ul>
      <li v-for="item in cartItems" :key="cartGetters.getItemSku(product)">
        <input type="number" @blur="updateItemQty({item, event})" />
        <button @click="removeItem({ item })">
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
  <!-- ... -->
</template>
<script>
import { computed, ref } from '@vue/composition-api';
import { useCart, cartGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { cart, removeItem, updateItemQty } = useCart();

    // TODO: load cart if it wasn't loaded before

    const cartItems = computed(() => cartGetters.getItems(cart.value));
    const totals = computed(() => cartGetters.getTotals(cart.value));
    const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

    const quantity = ref(1);

    return {
      cartItems,
      totals,
      totalItems,
      removeItem,
      updateItemQty,
      quantity,
      cartGetters
    };
  }
};
</script>
```

## Checking if an item is in the cart

To check if a specific product configuration is already in the cart, pass it to `isInCart` method:

```vue
<template>
  <!-- ... -->
  <ul>
    <li v-for="product in products" :key="productGetters.getId(product)">
      <!-- ... -->
       <div
          :isAddedToCart="isInCart({ product })"
        >
        </div>
    </li>
  </ul>
  <!-- ... -->
</template>
<script>
import { computed } from '@vue/composition-api';
import { useCart, useFacet, facetGetters, productGetters } from '{INTEGRATION}';

export default {  
  setup() {
    const { isInCart } = useCart();
     const { result } = useFacet();
    const products = computed(() => facetGetters.getProducts(result.value));

    return {
      isInCart,
      products,
      productGetters
    };
  }
};
</script>
```

## Removing all cart items at once

To clear cart items (not delete the cart itself) use the `clear` method.

```vue
<template>
  <!-- ... -->
  <div>
    <ul>
      <li v-for="item in cartItems" :key="cartGetters.getItemSku(product)">
        <!-- ... -->
      </li>
    </ul>
    <button @click="clear">
      Clear cart
    </button>
  </div>
  <!-- ... -->
</template>
<script>
import { computed } from '@vue/composition-api';
import { useCart, cartGetters } from '{INTEGRATION}';

export default {
  setup() {
    const { cart, clear } = useCart();
    const cartItems = computed(() => cartGetters.getItems(cart.value));

    return {
      cartItems,
      clear,
      cartGetters
    };
  }
};
</script>
```

## Applying and removing discount coupons

You can apply promotional coupons to your cart with `applyCoupon` and remove with `removeCoupon` method:

```vue
<template>
  <!-- ... -->
  <div>
    <input type="text" v-model="promoCode" />
    <button @click="() => applyCoupon({ couponCode: promoCode })">
      Use promo code
    </button>
    <button @click="() => removeCoupon({ couponCode: promoCode })">
      Remove promo code
    </button>
  </div>
  <!-- ... -->
</template>
<script>
import { ref } from '@vue/composition-api';
import { useCart } from '{INTEGRATION}';

export default {
  setup() {
    const { applyCoupon, removeCoupon } = useCart();

    const promoCode = ref('');

    return {
      applyCoupon,
      removeCoupon,
      promoCode
    };
  }
};
</script>
```

## Loading and creating the wishlist

The `load` method will load your cart from the server or create a new one if it doesn't exist. The `wishlist` object will be `null` until you load it.

```vue
<script>
import { useWishlist } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { wishlist, load } = useWishlist();

    onSSR(async () => {
      await load();
    });

    return {
      wishlist,
      load
    };
  }
};
</script>
```

## Adding an item to the wishlist

To add the product to the wishlist you can use `addItem` method:

```vue
<template>
  <!-- ... -->
  <ul>
    <li v-for="product in products" :key="productGetters.getId(product)">
      <!-- ... -->
      <button @click="addItem({ product })">
        Add to wishlist
      </button>
    </li>
  </ul>
  <!-- ... -->
</template>
<script>
import { computed } from '@vue/composition-api';
import { useWishlist, useFacet, facetGetters, productGetters } from '{INTEGRATION}';

export default {
  setup() {
    const { addItem } = useWishlist();
    const { result } = useFacet();
    const products = computed(() => facetGetters.getProducts(result.value));

    return {
      products,
      addItem,
      productGetters
    };
  }
};
</script>
```

## Removing an item from the wishlist

To remove an item from the cart use `removeItem` method.

```vue
<template>
  <!-- ... -->
  <div>
    <ul>
      <li v-for="item in wishlistItems" :key="wishlistGetters.getWishlistItemSku(product)">
        <!-- ... -->
        <button @click="removeItem({ item })">
          Remove item
        </button>
      </li>
    </ul>
    <span>
      {{ totalItems }}
    </span>
  </div>
  <!-- ... -->
</template>
<script>
import { computed } from '@vue/composition-api';
import { useWishlist, wishlistGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const { wishlist, removeItem } = useWishlist();

    const wishlistItems = computed(() => wishlistGetters.getItems(wishlist.value));
    const totalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );

    // TODO: load wishlist if it's not loaded before

    return {
      wishlistItems,
      wishlistGetters,
      totalItems,
      removeItem
    };
  }
};
</script>
```

## Checking if a single item is on the wishlist

To check if a product is already on the wishlist pass it to `isInWishlist` method:

```vue
<template>
  <!-- ... -->
    <ul>
      <li
        v-for="product in products" :key="productGetters.getId(product)"
      >
        <div
          :isAddedToWishlist="isInWishlist({ product })"
        >
        </div>
      </li>
    </ul>
  <!-- ... -->
</template> 
<script>
import { computed } from '@vue/composition-api';
import { useWishlist, useFacet, facetGetters, productGetters } from '{INTEGRATION}';
export default {
  setup() {
    const { result } = useFacet();
    const { cart, isInWishlist } = useWishlist();
    const products = computed(() => facetGetters.getProducts(result.value));

    return {
      isInWishlist,
      products,
      productGetters,
    };
  }
};
</script>
```

## Removing all wishlist items at once

Cleaning the wishlist can be achieved by `clear` property.

```vue
<template>
  <!-- ... -->
  <div>
    <ul>
      <li v-for="item in wishlistItems" :key="wishlistGetters.getWishlistItemSku(product)">
        <!-- ... -->
      </li>
    </ul>
    <button @click="clear">
      Clear wishlist
    </button>
  </div>
  <!-- ... -->
</template>
<script>
import { computed } from '@vue/composition-api';
import { useWishlist, wishlistGetters } from '{INTEGRATION}';

export default {
  setup() {
    const { wishlist, clear } = useWishlist();
    const wishlistItems = computed(() => wishlistGetters.getItems(wishlist.value));

    return {
      wishlistItems,
      clear
    };
  }
};
</script>
```

## Summary

### Common usage example

Here is an example of how both composables can be used in real-life applications. We have three components: a product list, a cart, and a wishlist. In the examples, we cover the logic of adding/removing items from the wish list and cart, working with getters, and loading state.

The product list:

```vue
<template>
  <ul>
    <li v-for="product in products" :key="productGetters.getId(product)">
      <button @click="addToCart({ product, quantity })">
        Add to cart
      </button>
      <button @click="addToWishlist({ product })">
        Add to wishlist
      </button>
      <span v-if="isInCart({ product })">
        added to cart
      </span>
      <span v-if="isInWishlist({ product })">
        added to wishlist
      </span>
    </li>
  </ul>
</template>
<script>
import { useCart, useWishlist, useFacet, facetGetters } from '{INTEGRATION}';

export default {
  setup() {
    const { addItem: addToCart, isInCart } = useCart();
    const { addItem: addToWishlist, isInWishlist } = useWishlist();
    const { result } = useFacet();
    
    const products = computed(() => facetGetters.getProducts(result.value));

    const quantity = ref(1);

    return {
      products,
      addToCart,
      isInCart,
      addToWishlist,
      isInWishlist,
      quantity
    };
  }
};
</script>
```

The cart component:

```vue
<template>
  <div>
    <ul>
      <li v-for="item in cartItems" :key="cartGetters.getItemSku(product)">
        <input type="number" @blur="updateItemQty({item, event})" />
        <button @click="removeItem({ item })">
          Remove from cart
        </button>
      </li>
    </ul>
    <span>
      {{ cartTotalItems }}
    </span>
    <button @click="clear">
      Clear cart
    </button>
  </div>
</template>
<script>
import { computed, ref } from '@vue/composition-api';
import { useCart, cartGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const { cart, clear, removeItem, updateItemQty, load } = useCart();

    const cartItems = computed(() => cartGetters.getItems(cart.value));
    const cartTotals = computed(() => cartGetters.getTotals(cart.value));
    const cartTotalItems = computed(() =>
      cartGetters.getTotalItems(cart.value)
    );

    const quantity = ref(1);

    onSSR(async () => {
      await load();
    });

    return {
      cartItems,
      cartTotalItems,
      removeItem,
      updateItemQty,
      clear,
      quantity,
      cartGetters
    };
  }
};
</script>
```

The wishlist component:

```vue
<template>
  <div>
    <ul>
      <li v-for="item in wishlistItems" :key="wishlistGetters.getWishlistItemSku(product)">
        <button @click="removeItem({ item })">
          Remove from wishlist
        </button>
      </li>
    </ul>
    <span>
      {{ wishlistTotalItems }}
    </span>
    <button @click="clear">
      Clear wishlist
    </button>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api';
import { useWishlist, wishlistGetters } from '{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';

export default {
  setup() {
    const { wishlist, removeItem, clear, load } = useWishlist();

    const wishlistItems = computed(() =>
      wishlistGetters.getItems(wishlist.value)
    );
    const wishlistTotalItems = computed(() =>
      wishlistGetters.getTotalItems(wishlist.value)
    );

    onSSR(async () => {
      await load();
    });

    return {
      wishlistItems,
      wishlistTotalItems,
      removeItem,
      clear,
      wishlistGetters
    };
  }
};
</script>
```

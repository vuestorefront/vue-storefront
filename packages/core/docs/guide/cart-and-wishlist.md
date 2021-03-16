# Cart and wishlist

Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 

## Loading and creating the cart

The `load` function will load your cart from the server or create a new one if it doesn't exist. The `cart` object will be `null` until you load it.


```vue
<script>
  import { useCart } from '{INTEGRATION}';
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
</script> 
```


## Adding an item to the cart

To add the product to the cart you can use `addItem` method:

```vue
<template>
  // ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
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
  import { computed } from '@vue/composition-api';
  import { useCart } from '{INTEGRATION}';
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

      return {
        addItem,
      };
    }
  };
</script>
``` 

## Removing items and changing their quantity

To remove an item from the cart use `removeItem` function, and similarly to update quantity use `updateItemQty` function:

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="(product, i) in products" :key="i"
        >
          <input type="number"/>
          <button
            @click="updateItemQty({ product, quantity })"
          >
            Change quantity
          </button>
          <button        
            @click="removeItem({ product })"
          >
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
  // ...
</template>   
<script>
  import { computed } from '@vue/composition-api';
  import { useCart, cartGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        cart,
        removeItem, 
        updateItemQty,
        loading
      } = useCart();

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

To check if a product is already in the cart, pass it to `isInCart` method:

```vue
<template>
  // ... 
    <ul>
      <li
         v-for="(product, i) in products" :key="i"
      >
        <div
          :isAddedToCart="isInCart({ product })"
        >
        </div>
      </li>
    </ul>
  // ...
</template>    
<script>
  import { computed } from '@vue/composition-api';
  import { useCart } from '{INTEGRATION}';

  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const {
        isInCart, 
      } = useCart();

      return {
        isInCart, 
      };
    }
  };
</script>
```

## Removing all cart items at once

To clear cart items (not delete it) use `clear` function.

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="(product, i) in products" :key="i"
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
  import { computed } from '@vue/composition-api';
  import { useCart, cartGetters } from '{INTEGRATION}';

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

You can apply promotional coupons to your cart with `applyCoupon` and remove with `removeCoupon` function:

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
  import { useCart } from '{INTEGRATION}';
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

## Loading and creating the wishlist

The `load` function will load your cart from the server or create a new one if it doesn't exist. The `wishlist` object will be `null` until you load it.

```vue
<script>
  import { useWishlist } from '{INTEGRATION}'
  import { onSSR } from '@vue-storefront/core'

  export default {
    setup () {
      const { 
        wishlist,      
        load,
      } = useWishlist()
      
      onSSR(async () => {
        await load()
      })

      return {
        wishlist,
        load      
      }
    }
  }
</script>
```


## Adding an item to the wishlist

To add the product to the wishlist you can use `addItem` method:

```vue
<template>
  // ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
      > 
        // ...
        <button
          @click="addItem({ product, quantity })"
        >
          Add to wishlist
        </button>
      </li>
    </ul>
  // ...
</template>
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist } from '{INTEGRATION}'

  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup (props) {
      const { addItem } = useWishlist();

      return {
        addItem,   
      }
    }
  }
</script>
```

## Removing an item from the wishlist
 
To remove an item from the cart use `removeItem` function.

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="(product, i) in products" :key="i"
        >
          ...
          <button
            @click="removeItem({ product })"
          >
            Clear wishlist
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
  // ...
</template>   
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist, 
        removeItem, 
        loading
      } = useWishlist();
    
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

      return {
        products,
        totals,
        totalItems,
        removeItem,
        loading
      };
    }
  };
</script>
```

## Checking if an item is on the wishlist 

To check if a product is already on the wishlist pass it to `isInWishlist` method:

```vue
<template>
  // ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
      >
        <div
          :isAddedToWishlist="isInWishlist({ product })"
        >
        </div>
      </li>
    </ul>
  // ...
</template>    
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist} from '{INTEGRATION}';
  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const {
        cart,
        isInWishlist, 
      } = useWishlist();

      return {
        isInWishlist, 
      };
    }
  };
</script>
```

## Removing all wishlist items at once

Cleaning the wishlist can be achieved by `clear` property.

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="(product, i) in products" :key="i"
        >
          // ...
        </li>
      <ul>
      <button
        @click="clear()"
      >
        Clear wishlist
      </button>
    </div>
  // ...
</template>   
<script>      
  import { computed } from '@vue/composition-api';
  import { useWishlist, wishlistGetters } from '{INTEGRATION}';

  export default {
    setup() {
      const {
        wishlist,
        clear, 
      } = useCart();
      const products = computed(() => wishlistGetters.getItems(wishlist.value));

      return {
        wishlist,
        products,
        clear 
      };
    }
  };
</script>
```

## Summary

### Common usage example

In the following examples, you can analyze how both composables are used in the simple use case. There are all above mentioned basic scenarios used in three main components: a product list, a cart, and a wishlist. It can be your basis for building real-life application implementation.    

```vue
<template>
    <ul>
      <li
        v-for="(product, i) in products" :key="i"> 
      >
        <button
          @click="addToCart({ product, quantity })"
        >
          Add to cart
        </button>
        <button
          @click="addToWishlist({ product })"
        >
          Add to wishlist
        </button>
        <div
          :isAddedToCart="isInCart({ product })"
        >
        </div>
        <div
          :isAddedToWishlist="isInWishlist({ product })"
        >
        </div>
      </li>
    </ul>
</template>    
<script>     
  import { useCart, useWishlist } from '{INTEGRATION}';

  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const {
        addItem: addToCart,
        isInCart,
        loading 
      } = useCart();

      const { 
        addItem: addToWishlist, 
        isInWishlist
      } = useWishlist()

      return {
        addToCart,
        isInCart,
        addToWishlist,
        isInWishlist,
        loading
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
        <li
          v-for="(product, i) in cartProducts" :key="i"
        > 
          <input 
            type="number" 
            v-model="quantity"
          >
          <button
            @input="updateItemQty({ product, quantity })"
          >
            Change quantity
          </button>
          <button        
            @click="removeItem({ product })"
          >
            Remove from cart
          </button>      
        </li>
      </ul>
      <span>
        {{ cartTotals.total }}
      </span>
      <span>
        {{ cartTotalItems }}
      </span>
      <button
        @click="clear"
      >
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
      const {
        cart,
        clear,
        removeItem, 
        updateItemQty,
        load,
      } = useCart();

      const cartProducts = computed(() => cartGetters.getItems(cart.value));
      const cartTotals = computed(() => cartGetters.getTotals(cart.value));
      const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value));     

      const quantity = ref(0);

      onSSR(async () => {
        await load();
      });

      return {
        cartProducts,
        cartTotals,
        cartTotalItems,
        removeItem,
        cart,
        updateItemQty,
        clear, 
        quantity
      };
    },
  };
</script>
```

The wishlist component:
```vue
<template>
    <div>
      <li>
        <ul
          v-for="(product, i) in wishlistProducts" :key="i"
        >
          <button
            @click="removeItem({ product })"
          >
            Remove from wishlist
          </button>
        </ul>
      <li>
      <span>
        {{ wishlistTotals.total }}
      </span>
      <span>
        {{ wishlistTotalItems }}
      </span>
      <button
        @click="clear"
      >
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
      const {
        wishlist,
        removeItem,
        clear,
        load
      } = useWishlist();

      const wishlistProducts = computed(() => wishlistGetters.getItems(wishlist.value));
      const wishlistTotals = computed(() => wishlistGetters.getTotals(wishlist.value));
      const wishlistTotalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

      onSSR(async () => {
        await load();
      });

      return {
        wishlistProducts,
        wishlistTotals,
        wishlistTotalItems,
        wishlist,                
        removeItem, 
        clear
      };
    },
  };
</script>
```

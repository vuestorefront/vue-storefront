# Cart and wishlist

Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 

## Loading and creating the cart

The `load` method will load your cart from the server or create a new one if it doesn't exist. The `cart` object will be `null` until you load it.


```js
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
```


## Adding item to the cart

To add the product to the cart you can use `addItem` method:

```vue
<template>
  <!-- ... -->
    <ul>
      <li
        v-for="product in products" :key="product.id"
      > 
        <!-- ... -->
        <button
          @click="addItem({ product, quantity })"
        >
          Add to cart
        </button>
      </li>
    </ul>
  <!-- ... -->
</template>    
<script>     
  import { ref } from '@vue/composition-api';
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

      const quantity = ref(1)

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
  <!-- ... -->
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
        >
          <input type="number" v-model="quantity"/>
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
  <!-- ... -->
</template>     
<script>
  import { computed, ref } from '@vue/composition-api';
  import { useCart, cartGetters } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        cart,
        removeItem, 
        updateItemQty,
        loading
      } = useCart();

      // load cart if it wasn't loaded before

      const products = computed(() => cartGetters.getItems(cart.value));
      const totals = computed(() => cartGetters.getTotals(cart.value));
      const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

      const quantity = ref(0)

      return {
        products,
        totals,
        totalItems,
        removeItem, 
        updateItemQty,
        loading,
        quantity
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
      <li
         v-for="product in products" :key="product.id"
      >       
          <span v-if="isInCart({product})"> added to cart </span>
      </li>
    </ul>
  <!-- ... -->
</template>    
<script>
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

To clear cart items (not delete them) use `clear` method.

```vue
<template>
  <!-- ... -->
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
        >
           <!-- ... -->
        </li>
      </ul>
      <button
        @click="clear"
      >
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
      const {
        cart,
        clear, 
      } = useCart();

      // load cart if it wasn't loaded before

      const products = computed(() => cartGetters.getItems(cart.value));

      return {
        clear 
      };
    }
  };
</script>
```


## Applying and removing discount coupons

You can apply promotional coupons to your cart with `applyCoupon` and remove them with `removeCoupon` method:

```vue
<template>
  <!-- ... -->
    <div>
      <input type="text" v-model="promoCode"/>
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
  <!-- ... -->
</template>   
<script>   
  import { ref } from '@vue/composition-api';   
  import { useCart } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        applyCoupon, 
        removeCoupon
      } = useCart();

      // load cart if it wasn't loaded before

      const promoCode = ref('')

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

```js
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


## Adding item to the wishlist

To add the product to the wishlist you can use `addItem` method:

```vue
<template>
   <!-- ... -->
    <ul>
      <li
        v-for="product in products" :key="product.id"
      > 
        <!-- ... -->
        <button
          @click="addItem({ product, quantity })"
        >
          Add to wishlist
        </button>
      </li>
    </ul>
  <!-- ... -->
</template>
<script>
  import { ref } from '@vue/composition-api';
  import { useWishlist } from '{INTEGRATION}'

  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const { addItem } = useWishlist();
      
      const quantity = ref(1)

      return {
        addItem, 
        quantity  
      }
    }
  }
</script>
```

## Removing item from the wishlist
 
To remove an item from the cart use `removeItem` method.

```vue
<template>
  <!-- ... -->
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
        > 
          <!-- ... -->
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
  <!-- ... -->
</template>    
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist, wishlistGetters } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        wishlist, 
        removeItem, 
        loading
      } = useWishlist();
    
      // load wishlist if it wasn't loaded before
    
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
   <!-- ... -->
    <ul>
      <li
        v-for="product in products" :key="product.id"
      >
        <span
          v-if="isInWishlist({ product })"
        >
          added to wishlist
        </span>
      </li>
    </ul>
   <!-- ... -->
</template>    
<script>
  import { useWishlist } from '{INTEGRATION}';
  export default {
    props: {
      products: {
        type: Array,
        required: true
      }
    },
    setup() {
      const {
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
  <!-- ... -->
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
        >
          <!-- ... -->
        </li>
      </ul>
      <button
        @click="clear"
      >
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
      const {
        wishlist,
        clear, 
      } = useWishlist();

      // load wishlist if it wasn't loaded before

      const products = computed(() => wishlistGetters.getItems(wishlist.value));

      return {
        products,
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
      <li
        v-for="product in products" :key="product.id"> 
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
        <span
          v-if="isInCart({ product })"
        >
          added to cart
        </span>
        <span
          v-if="isInWishlist({ product })"
        >
          added to wishlist
        </span>
      </li>      
    </ul>
</template>    
<script>     
  import { ref } from '@vue/composition-api';
  import { useCart, useWishlist } from '@vue-storefront/boilerplate';

  export default {
    props: {
      products: {
        type: Array,
        required: true,
      }
    },
    setup() {
      const {
        addItem: addToCart,
        isInCart,         
      } = useCart();

      const { 
        addItem: addToWishlist, 
        isInWishlist
      } = useWishlist()

      const quantity = ref(1)

      return {
        addToCart,
        isInCart,
        addToWishlist,
        isInWishlist,        
        quantity
      };
    },
  };
</script>
```

The cart component:

```vue
<template>
  <div>
    <ul>
      <li
        v-for="product in cartProducts" :key="product.id"
      > 
        <input 
          type="number" 
          v-model="quantity"
        >
        <button
          @click="updateItemQty({ product, quantity })"
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
    <ul>
      <li
        v-for="product in wishlistProducts" :key="product.id" 
      >
        <button
          @click="removeItem({ product })"
        >
          Remove from wishlist
        </button>
      </li>
    </ul>
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
        removeItem, 
        clear
      };
    },
  };
</script>
```

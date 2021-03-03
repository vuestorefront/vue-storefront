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


## Adding item to the cart

To add the product to the cart you can `addItem` method:

```vue
<template>
  ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
      > 
        ...
        <button
          @click="addItem({ product, parseInt(quantity) })"
        >
          Add to cart
        </button>
      </li>
    </ul>
  ...
</template>    
<script>     
  import { computed } from '@vue/composition-api';
  import { useCart, useFacet, facetGetters  } from '{INTEGRATION}';
  export default {
    setup() {
      const { result } = useFacet();
      const {
        addItem,
      } = useCart();
      const products = computed(() => facetGetters.getProducts(result.value));

      return {
        products,
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
  ...
    <div>
      <div>
        <input type="number" v-model="quantity"/>
        <button
           @click=="updateItemQty({ product, quantity })"
        />
        <button        
          @click="removeItem({ product })"
        >
          Remove product
        </button>
      </div>
      <span>
        {{ totals.total }}
      </span>
      <span>
        {{ totalItems }}
      </span>
    </div>
  ...
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
  ... 
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
  ...
</template>    
<script>
  import { useCart, cartGetters } from '{INTEGRATION}';

  export default {
    setup() {
      const {
        isInCart, 
      } = useCart();
      const products = computed(() => cartGetters.getItems(cart.value));

      return {
        products,
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
  ...
    <div>
      <ul>
        <li
          v-for="(product, i) in products" :key="i"
        >
          ...
        </li>
      <ul>
      <button
        @click="clear(cart.value)"
      >
        Clear cart
      </button>
    </div>
  ...
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
        cart,
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
  ...
    <div>
      <input
        v-model="promoCode"
      />
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
  ...
</template>   
<script>      
  import { computed } from '@vue/composition-api';
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


## Adding item to the wishlist

To add the product to the wishlist you can use `addItem` method:

```vue
<template>
  ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
      > 
        ...
        <button
          @click="addItem({ product, parseInt(quantity) })"
        >
          Add to wishlist
        </button>
      </li>
    </ul>
  ...
</template>
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist, useFacet, facetGetters } from '{INTEGRATION}'

  export default {
    setup () {
      const { result } = useFacet();
      const { addItem } = useWishlist()
      const products = computed(() => facetGetters.getProducts(result.value));

      return {
        products,
        addItem,   
      }
    }
  }
</script>
```

## Removing the item from the wishlist
 
To remove an item from the cart use `removeItem` function.

```vue
<template>
  ...
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
  ...
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

## Checking if the item is on the wishlist 

To check if a product is already on the wishlist pass it to `isOnWishlist` method:

```vue
<template>
  ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"
      >
        <div
          :isAddedToWishlist="isOnWishlist({ product })"
        >
        </div>
      </li>
    </ul>
  ...
</template>    
<script>
  import { computed } from '@vue/composition-api';
  import { useWishlist, useFacet, facetGetters } from '{INTEGRATION}';
  export default {
    setup() {
      const { result } = useFacet();
      const {
        cart,
        isOnWishlist, 
      } = useWishlist();
      const products = computed(() => facetGetters.getProducts(result.value));

      return {
        products,
        isOnWishlist, 
      };
    }
  };
</script>
```

## Deleting all items added to wishlist

Cleaning the wishlist can be achieved by `clear` property.

```vue
<template>
  ...
    <div>
      <ul>
        <li
          v-for="product in products"
        >
          ...
        </li>
      <ul>
      <button
        @click="clear(cart.value)"
      >
        Clear wishlist
      </button>
    </div>
  ...
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

In the following two examples, you can analyze how both composables are used in the simple use case. There are all above mentioned basic scenarios used in three main components: a product list, a cart, and a wishlist. It can be your basis for building real-life application implementation.    

```vue
<template>
  ...
    <ul>
      <li
        v-for="(product, i) in products" :key="i"> 
      >
        <button
          @click="addToCart({ product, parseInt(quantity) })"
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
          :isAddedToCart="isOnWishlist({ product })"
        >
        </div>
      </li>
    </ul>
  ...
</template>    
<script>     
  import { useCart, useWishlist, useFacet, facetGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const { result } = useFacet();
      const {
        addItem: addToCart,
        isInCart,
        loading 
      } = useCart();

      const { 
        addItem: addToWishlist, 
        isOnWishlist
      } = useWishlist()
      const products = computed(() => facetGetters.getProducts(result.value));

      return {
        products,
        addToCart,
        isInCart,
        addToWishlist,
        isOnWishlist,
        loading
      };
    }
  };
</script>
```

The cart and the wishlist components:

```vue
<template>

  /* Cart component */
  ...
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
            @input="updateQuantity({ product, quantity })"
          >
            Add more
          </button>
          <button        
            @click="removeFromCart({ product })"
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
        @click="clearCart()"
      >
        Clear cart
      </button>
    </div>
  ...

  /* Similar features you can use on wishlist component */

    <div>
      <li>
        <ul
          v-for="(product, i) in wishlistProducts" :key="i"
        >
          <button
            @click="removeFromWishlist({ product })"
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
        @click="clearWishlist()"
      >
        Clear wishlist
      </button>
    </div>
  ...
</template>   
<script> 
  import { computed } from '@vue/composition-api';
  import { useCart, cartGetters, useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist,
        removeItem: removeFromWishlist,
        clear: clearWishlist,
        load: loadWishlist
      } = useWishlist();
      const {
        cart,
        clear: clearCart,
        removeItem: removeFromCart, 
        updateItemQty,
        load: loadCart,
      } = useCart();

      const cartProducts = computed(() => cartGetters.getItems(cart.value));
      const cartTotals = computed(() => cartGetters.getTotals(cart.value));
      const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value));

      const wishlistProducts = computed(() => wishlistGetters.getItems(wishlist.value));
      const wishlistTotals = computed(() => wishlistGetters.getTotals(wishlist.value));
      const wishlistTotalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));


      // Use one of the following depending on which component you are using

      onSSR(async () => {
        await loadWishlist();
      });

      onSSR(async () => {
        await loadCart();
      });

      return {
        cartProducts,
        cartTotals,
        cartTotalItems,
        removeFromCart,
        cart,
        updateItemQty,
        clearCart, 
        wishlistProducts,
        wishlistTotals,
        wishlistTotalItems,
        wishlist,                
        removeFromWishlist, 
        clearWishlist
      };
    }
  };
</script>
```
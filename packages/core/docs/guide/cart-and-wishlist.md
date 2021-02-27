# Cart and wishlist

## Introduction

Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 

## Loading and creating cart

The `load` function will load your cart from the server or create a new one if it doesn't exist. The `cart` object will be `null` until you load it.


```js
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


## Adding item to cart

To add the product to the cart you can `addToCart` method:

```vue
<template>
  <div>
      <button
        @click="addToCart(product, parseInt(quantity))"
      >
      </button>
  </div>
</template>    
<script>     
  import { useCart } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        addToCart,
        loading 
      } = useCart();

      return {
        addToCart,
        loading
      };
    }
  };
</script>
``` 

## Removing items and changing their quantity

To remove an item from the cart use `removeItem` function:

```vue
<template>
  <div>
    <div>
      <input
        @input="updateQuantity(product, quantity)"
      />
      <button        
        @click="removeFromCart(product)"
      >
      </button>
    </div>
    <span>
      {{totals}}
    </span>
    <span>
      {{totalItems}}
    </span>
  </div>
</template>   
<script>
  import { useCart, cartGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        removeFromCart, 
        updateItemQty,
        loading
      } = useCart();

      const products = computed(() => cartGetters.getItems(cart.value));
      const totals = computed(() => cartGetters.getTotals(cart.value));
      const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

      return {
        products,
        totals,
        totalItems,
        removeFromCart, 
        updateItemQty,
        loading
      };
    }
  };
</script>
```

## Checking if an item is in the cart

To check if a product is already in cart just pass it to `isOnCart` method:

```vue
<template>
  <ul>
    <li>
      <icon
        :isAddedToCart="isOnCart(product)"
      />
    </li>
  </ul>
</template>    
<script>
  import { useCart } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        isOnCart, 
      } = useCart();

      return {
        isOnCart, 
      };
    }
  };
</script>
```

## Removing all cart items at once

To clear cart items (not delete it) just use `clearCart` function.

```vue
<template>
  <div>
    <ul>
      <li
        v-for="product in products"
      >
      </li>
    <ul>
    <button
      @click="clear(cart.value)"
    >
    </button>
  </div>
</template>   
<script>      
  import { useCart } from '{INTEGRATION}';
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

You can apply promotional coupons to your applicationn with `applyCoupon` function. 

```vue
<template>
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
</template>   
<script>      
  import { useCart } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        cart,
        applyCoupon, 
      } = useCart();
      const products = computed(() => cartGetters.getItems(cart.value));
      const totals = computed(() => cartGetters.getTotals(cart.value));
      const totalItems = computed(() => cartGetters.getTotalItems(cart.value));

      return {
        products,
        totals,
        totalItems,
        cart,
        applyCoupon,
        removeCoupon
      };
    }
  };
</script>
```

## Loading useWishlist into your application 

To use wishlist in your application, it needs to be loaded first. So you can use `load` function only once, and it will exist. 

```js
<script>
  import { useWishlist } from '{INTEGRATION}'
  import { onSSR } from '@vue-storefront/core'

  export default {
    setup () {
      const { 
        wishlist,      
        load: loadWishlist
      } = useWishlist()
      
      onSSR(async () => {
        await loadWishlist()
      })

      return {
        wishlist      
      }
    }
  }
</script>
```


## Adding items to a wishlist

The product can be added to the wishlist similarly like to the cart but using `addToWishlist` function:

```vue
<template>
   <li>
    <li>
      <button
        @click="addToWishlist(product)"
      >
      </button>
    </li>
  </li>
</template>
<script>
  import { useWishlist } from '{INTEGRATION}'

  export default {
    setup () {
      const { 
        addToWishlist, 
      } = useWishlist()

      return {
        addToWishlist      
      }
    }
  }
</script>
```

## Removing the item from the wishlist
 
In order to remove products use `removeFromWishlist` function. 

```vue
<template>
  <ul>
    <li
      for="product in products"
    >
      <button
        @click="removeFromWishlist(product)"
      >
      </button>
    </li>
    <span>
      {{totals}}
    </span>
    <span>
      {{totalItems}}
    </span>
  </ul>
</template>   
<script>
  import { useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist, 
        removeFromWishlist, 
        loadWishlist
      } = useWishlist();
    
    const products = computed(() => wishlistGetters.getItems(wishlist.value));
    const totals = computed(() => wishlistGetters.getTotals(wishlist.value));
    const totalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

    onSSR(async () => {
      await loadWishlist();
    });

      return {
        products,
        totals,
        totalItems,
        removeFromCart,
        loading
      };
    }
  };
</script>
```

## Checking if the item is added to the wishlist 

If you want to show that product is already added to `wishlist`, use `isOnWishlist` function like so:

```vue
<template>
  <ul>
    <li>
      <icon
        :isAddedToCart="isOnWishlist(product)"
      />
    </li>
  </ul>
</template>    
<script>
  import { useWishlist } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        isOnWishlist, 
      } = useWishlist();

      return {
        isOnWishlist, 
      };
    }
  };
</script>
```

## Deleting all items added to wishlist

Cleaning the wishlist can be achieved by `clearWishlist` property.

```vue
<template>
  <div>
    <ul>
      <li
        v-for="product in products"
      />
    <ul>
    <button
      @click="clearWishlist"
    >
    </button>
  </div>
</template>   
<script>      
  import { useWishlist } from '{INTEGRATION}';

  export default {
    setup() {
      const {
        wishlist,
        clearWishlist, 
      } = useCart();
      const products = computed(() => wishlistGetters.getItems(wishlist.value));

      return {
        products,
        clearWishlist 
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
  <li>
    <ul
      v-for="product in products"
    >
      <button
        @click="addToCart(product, parseInt(quantity))"
      >
      </button>
      <button
        @click="addToWishlist(product)"
      >
      </button>
      <icon
        :isAddedToCart="isOnCart(product)"
      />
      <icon
        :isAddedToCart="isOnWishlist(product)"
      />
    </ul>
  </li>
</template>    
<script>     
  import { useCart, useWishlist } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        addToCart,
        isOnCart,
        loading 
      } = useCart();

      const { 
        addToWishlist, 
        isOnWishlist
      } = useWishlist()


      return {
        addToCart,
        isOnCart,
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

  <div>
    <ul>
      <li>
        v-for="product in cartProducts"
      > 
        <input
          @input="updateQuantity(product, quantity)"
        />
        <button        
          @click="removeFromCart(product)"
        >
        </button>      
      </li>
    </ul>
    <span>
      {{cartTotals}}
    </span>
    <span>
      {{cartTotalItems}}
    </span>
    <button
      @click="clear(cart.value)"
    />
  </div>

  /* Similar features you can use on wishlist component */

  <div>
    <li>
      <ul
        v-for="product in wishlistProducts"
      />
        <button
          @click="removeFromCart(product)"
        />
      </ul>
    <li>
    <span>
      {{wishlistTotals}}
    </span>
    <span>
      {{wishlistTotalItems}}
    </span>
    <button
      @click="clearWishlist"
    >
    </button>
  </div>
</template>   
<script>      
  import { useCart, cartGetters, useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist,
        removeFromWishlist,
        clearWishlist 
      } = useWishlist();
      const {
        cart,
        clear,
        removeFromCart, 
        updateItemQty,
        loading
      } = useCart();

      const cartProducts = computed(() => cartGetters.getItems(cart.value));
      const cartTotals = computed(() => cartGetters.getTotals(cart.value));
      const cartTotalItems = computed(() => cartGetters.getTotalItems(cart.value));

      const wishlistProducts = computed(() => wishlistGetters.getItems(wishlist.value));
      const wishlistTotals = computed(() => wishlistGetters.getTotals(wishlist.value));
      const wishlistTotalItems = computed(() => wishlistGetters.getTotalItems(wishlist.value));

      onSSR(async () => {
        await loadWishlist();
      });

      return {
        cartProducts,
        cartTotals,
        cartTotalItems,
        removeFromCart,
        cart,
        updateItemQty,
        clear, 
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
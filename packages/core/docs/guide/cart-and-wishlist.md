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

To add the product to the cart you can `addItem` method:

```vue
<template>
  ...
    <div>
        <button
          @click="addItem(product, parseInt(quantity))"
        >
          Add to cart
        </button>
    </div>
  ...
</template>    
<script>     
  import { useCart } from '{INTEGRATION}';
  export default {
    setup() {
      const {
        addItem,
        loading 
      } = useCart();

      return {
        addItem,
        loading
      };
    }
  };
</script>
``` 

## Removing items and changing their quantity

To remove an item from the cart use `removeItem` function and similarly to update quantity use `updateItemQty` function:

```vue
<template>
  ...
    <div>
      <div>
        <input
          @input="updateItemQty(product, quantity)"
        />
        <button        
          @click="removeItem(product)"
        >
          Remove product
        </button>
      </div>
      <span>
        {{totals}}
      </span>
      <span>
        {{totalItems}}
      </span>
    </div>
  ...
</template>   
<script>
  import { useCart, cartGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        removeItem, 
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
        removeItem, 
        updateItemQty,
        loading
      };
    }
  };
</script>
```

## Checking if an item is in the cart

To check if a product is already in cart just pass it to `isInCart` method:

```vue
<template>
  ... 
    <ul>
      <li>
        <icon
          :isAddedToCart="isInCart(product)"
        />
      </li>
    </ul>
  ...
</template>    
<script>
  import { useCart } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
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

To clear cart items (not delete it) just use `clear` function.

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
        Clear cart
      </button>
    </div>
  ...
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

You can apply promotional coupons to your application with `applyCoupon` and remove with `removeCoupon` function:

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

The product can be added to the wishlist similarly like to the cart but using `addItem` function:

```vue
<template>
  ...
    <li>
      <li>
        <button
          @click="addItem(product)"
        >
          Add to wishlist
        </button>
      </li>
    </li>
  ...
</template>
<script>
  import { useWishlist } from '{INTEGRATION}'

  export default {
    setup () {
      const { 
        addItem, 
      } = useWishlist()

      return {
        addItem      
      }
    }
  }
</script>
```

## Removing the item from the wishlist
 
In order to remove products use `removeItem` function. 

```vue
<template>
  ...
    <ul>
      <li
        for="product in products"
      >
        <button
          @click="removeItem(product)"
        >
          Clear wishlist
        </button>
      </li>
      <span>
        {{totals}}
      </span>
      <span>
        {{totalItems}}
      </span>
    </ul>
  ...
</template>   
<script>
  import { useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist, 
        removeItem, 
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

## Checking if an item is added to the wishlist 

If you want to show that product is already added to `wishlist`, use `isInWishlist` function like so:

```vue
<template>
  ...
    <ul>
      <li>
        <icon
          :isAddedToCart="isInWishlist(product)"
        />
      </li>
    </ul>
  ...
</template>    
<script>
  import { useWishlist } from '{INTEGRATION}';
  export default {
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
        @click="clear"
      >
        ...
      </button>
    </div>
  ...
</template>   
<script>      
  import { useWishlist } from '{INTEGRATION}';

  export default {
    setup() {
      const {
        wishlist,
        clear, 
      } = useCart();
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

In the following two examples, you can analyze how both composables are used in the simple use case. There are all above mentioned basic scenarios used in three main components: a product list, a cart, and a wishlist. It can be your basis for building real-life application implementation.    

```vue
<template>
  ...
    <li>
      <ul
        v-for="product in products"
      >
        <button
          @click="addToCart(product, parseInt(quantity))"
        >
          Add to cart
        </button>
        <button
          @click="addToWishlist(product)"
        >
          Add to wishlist
        </button>
        <icon
          :isAddedToCart="isInCart(product)"
        />
        <icon
          :isAddedToCart="isInWishlist(product)"
        />
      </ul>
    </li>
  ...
</template>    
<script>     
  import { useCart, useWishlist } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
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

The cart and the wishlist components:

```vue
<template>

  /* Cart component */
  ...
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
            Remove from cart
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
        @click="clearCart(cart.value)"
      >
        Clear cart
      </button>
    </div>
  ...

  /* Similar features you can use on wishlist component */

    <div>
      <li>
        <ul
          v-for="product in wishlistProducts"
        >
          <button
            @click="removeFromWishlist(product)"
          >
            Remove from wishlist
          </button>
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
        Clear wishlist
      </button>
    </div>
  ...
</template>   
<script>      
  import { useCart, cartGetters, useWishlist, wishlistGetters } from '{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
  export default {
    setup() {
      const {
        wishlist,
        removeItem: removeFromWishlist,
        clear: clearWishlist,
      } = useWishlist();
      const {
        cart,
        clear: clearCart,
        removeItem: removeFromCart, 
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
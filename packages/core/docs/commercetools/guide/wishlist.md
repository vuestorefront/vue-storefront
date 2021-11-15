# Wishlist

Customer's cart can be loaded using `useWishlist` composable and data can be accessed using `wishlistGetters`.

## Loading and creating the wishlist

The `load` method will load your cart from the server or create a new one if it doesn't exist. The `wishlist` object will be `null` until you load it.

```vue
<script>
  import { useWishlist } from '@vue-storefront/commercetools'
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

To add the product to the wishlist, you can use `addItem` method:

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
          Add to wishlist
        </button>
      </li>
    </ul>
  // ...
</template>
<script>
  import { computed } from '@nuxtjs/composition-api';
  import { useWishlist } from '@vue-storefront/commercetools'

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
 
To remove an item from the cart, use `removeItem` method.

```vue
<template>
  // ...
    <div>
      <ul>
        <li
          v-for="product in products" :key="product.id"
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
  import { computed } from '@nuxtjs/composition-api';
  import { useWishlist, wishlistGetters } from '@vue-storefront/commercetools';
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

To check if a product is already on the wishlist, pass it to `isInWishlist` method:

```vue
<template>
  // ...
    <ul>
      <li
        v-for="product in products" :key="product.id"
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
  import { computed } from '@nuxtjs/composition-api';
  import { useWishlist} from '@vue-storefront/commercetools';
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
          v-for="product in products" :key="product.id"
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
  import { computed } from '@nuxtjs/composition-api';
  import { useWishlist, wishlistGetters } from '@vue-storefront/commercetools';

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

Here is an example of how both composables can be used in real-life applications. We have three components: a product list, a cart, and a wishlist. In the examples, we cover the logic of adding/removing items from the wish list and cart, working with getters, and loading state.

The product list: 

```vue
<template>
    <ul>
      <li
        v-for="product in products" :key="product.id"> 
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
  import { useCart, useWishlist } from '@vue-storefront/commercetools';

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
          v-for="product in cartProducts" :key="product.id"
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
  import { computed, ref } from '@nuxtjs/composition-api';
  import { useCart, cartGetters } from '@vue-storefront/commercetools';
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
          v-for="product in wishlistProducts" :key="product.id"
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
  import { computed } from '@nuxtjs/composition-api';
  import { useWishlist, wishlistGetters } from '@vue-storefront/commercetools';
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

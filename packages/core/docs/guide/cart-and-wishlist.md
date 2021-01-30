# Cart and wishlist

## Introduction

This document will guide you all the way to fully implement cart and wishlist modules, which will let you use these common features in your application in the best possible way. 
Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 


## Using cart
1.  loading cart in your application

First thing you need to do to start using cart in your application is importing useCart from your ecommerce integration. In order to that `load`function must be used and all it does is fetching cart from server and create new in your application if it doesn't exist. Basing on that you can start using `cart` object which structure depends on the ecommerce implementation you are using. 


```js
<script>
  import { useCart } from '@vue-storefront/{INTEGRATION}';
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


1.  basic usage scenarios:

     * adding an item

```js
<template>
  <ProductList>
    <ProductComponent>
      <AddToCartButton
        @click="addToCart(product, parseInt(quantity))"
      />
    </ProductComponent>
  </ProductList>
</template>    
<script>     
  import { useCart } from '@vue-storefront/{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
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


     * removing an item from a cart and update quantity



```js
<template>
  <CartComponent>
    <ProductComponent>
      <RemoveButton
        @input="updateQuantity(product, quantity)"
        @click="removeFromCart(product)"
      />
    </ProductComponent>
    <TotalPriceComponent>
      {{totals}}
    </TotalPriceComponent>
    <TotalItemsComponent>
      {{totalItems}}
    </TotalItemsComponent>
  </CartComponent>
</template>   
<script>
  import { useCart, cartGetters } from '@vue-storefront/{INTEGRATION}';
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
     * checking if an item is on a cart

```js
<template>
  <ProductList>
    <ProductComponent>
      <AddedToCartIcon
        :isAddedToCart="isOnCart(product)"
      />
    </ProductComponent>
  </ProductList>
</template>    
<script>
  import { useCart } from '@vue-storefront/{INTEGRATION}';
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

     * cleaning a cart

```js
<template>
  <CartComponent>
    <ProductsList>
      <ProductComponent
        v-for="product in products"
      />
    <ProductsList>
    <ClearProductListButton
      @click="clear(cart.value)"
    />
  </CartComponent>
</template>   
<script>      
  import { useCart } from '@vue-storefront/{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
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



 3. other scenarios:
     * applying and removing coupons from a cart

```js
<template>
  <CartComponent>
    <ApplyCouponButton 
      @click="() => applyCoupon({ couponCode: promoCode })"
    >
      Use promo code
    </ApplyCouponButton>
    <RemoveCouponButton 
      @click="() => removeCoupon({ couponCode: promoCode })"
    >
      Remove promo code
    </RemoveCouponButton>
  </CartComponent>
</template>   
<script>      
  import { useCart } from '@vue-storefront/{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
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

     * guest carts 
 

## Using wishlist
1. loading useWishlist into your application 

In order to use wishlist in your application, it needs to be loaded first. So you can load it only once and it will exist. 

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

1. basic usage scenarios:
[show on examples]
   * adding 
```js
<template>
   <ProductList>
    <ProductComponent>
      <AddToWishlistButton
        @click="addToWishlist(product)"
      />
    </ProductComponent>
  </ProductList>
</template>
<script>
  import { useWishlist } from '{INTEGRATION}'
  import { onSSR } from '@vue-storefront/core'

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

   * removing
```js
<template>
  <WishlistComponent>
    <ProductComponent>
      <RemoveButton
        @click="removeFromWishlist(product)"
      />
    </ProductComponent>
    <TotalPriceComponent>
      {{totals}}
    </TotalPriceComponent>
    <TotalItemsComponent>
      {{totalItems}}
    </TotalItemsComponent>
  </WishlistComponent>
</template>   
<script>
  import { useWishlist, wishlistGetters } from '@vue-storefront/{INTEGRATION}';
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

   * checking 

```js
<template>
  <ProductList>
    <ProductComponent>
      <AddedToWishlistIcon
        :isAddedToCart="isOnWishlist(product)"
      />
    </ProductComponent>
  </ProductList>
</template>    
<script>
  import { useWishlist } from '@vue-storefront/{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
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

   * cleaning 

```js
<template>
  <WishlistComponent>
    <ProductsList>
      <ProductComponent
        v-for="product in products"
      />
    <ProductsList>
    <ClearWishlistButton
      @click="clearWishlist"
    />
  </WishlistComponent>
</template>   
<script>      
  import { useWishlist } from '@vue-storefront/{INTEGRATION}';
  import { onSSR } from '@vue-storefront/core';
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
1. common usage example
 [one common example which includes basic usage scenarios]
ProductList

```js
<template>
  <ProductList>
    <ProductComponent
      v-for="product in products"
    >
      <AddToCartButton
        @click="addToCart(product, parseInt(quantity))"
      />
      <AddToWishlistButton
        @click="addToWishlist(product)"
      />
      <AddedToCartIcon
        :isAddedToCart="isOnCart(product)"
      />
      <AddedToWishlistIcon
        :isAddedToCart="isOnWishlist(product)"
      />
    </ProductComponent>
  </ProductList>
</template>    
<script>     
  import { useCart, useWishlist } from '@vue-storefront/{INTEGRATION}';
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

Cart / Wishlist components

```js
<template>

  /* Cart component */

  <CartComponent>
    <ProductComponent
      v-for="product in cartProducts"
    > 
      <QuantityInput
        @input="updateQuantity(product, quantity)"
      />
      <RemoveButton        
        @click="removeFromCart(product)"
      />      
    </ProductComponent>
    <TotalPriceComponent>
      {{cartTotals}}
    </TotalPriceComponent>
    <TotalItemsComponent>
      {{cartTotalItems}}
    </TotalItemsComponent>
    <ClearProductListButton
      @click="clear(cart.value)"
    />
  </CartComponent>

  /* Similar features you cn use on wishlist component */

  <WishlistComponent>
    <ProductsList>
      <ProductComponent
        v-for="product in wishlistProducts"
      />
        <RemoveButton
          @click="removeFromCart(product)"
        />
      </ProductComponent>
    <ProductsList>
    <TotalPriceComponent>
      {{wishlistTotals}}
    </TotalPriceComponent>
    <TotalItemsComponent>
      {{wishlistTotalItems}}
    </TotalItemsComponent>
    <ClearWishlistButton
      @click="clearWishlist"
    />
  </WishlistComponent>
</template>   
<script>      
  import { useCart, cartGetters, useWishlist, wishlistGetters } from '@vue-storefront/{INTEGRATION}';
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

2. list of available properties and getters
[list of properties and getters for useCart and useWishlist, in form of the table]

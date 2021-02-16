# Cart and wishlist

> This page assumes you're familiar with Composition API and Composables. Read them first if you are new to these concepts.

## Introduction

This document will guide you all the way to fully implement cart and wishlist modules, which will let you use these common features in your application in the best possible way. 
Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 


## Using cart

### loading cart in your application

The first thing that you need to do to start using the cart in your application is importing `useCart` from your ecommerce integration. Import `load`function which fetch the cart from a server and create a new one in your application if it doesn't already exist. Based on that, you can start using `cart` object, which structure depends on the ecommerce implementation you are using. 


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


### Adding an item

To add the product to the cart you need to apply `AddToCart` method in the following way:  

```vue
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
`loading` is the object which includes the loading state of the element.   


### Removing an item from a cart and update quantity

The product in the cart of your application needs to have some kind of remove button, so adding `removeFromCart` function is needed. It can be done similarly to other `useCart` properties. 

```vue
<template>
  <CartComponent>
    <ProductComponent>
      <QuantityInput
        @input="updateQuantity(product, quantity)"
      />
      <RemoveButton        
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
As you can see in the above example, we use getters to pass the values to the component: all products already in a cart, total price, and items in cart. It's the way to access `cart` object properties and, to make them work, you need to import `cartGetters` object and use a proper getter function as the computed value.    


### Checking if an item is on a cart

You can inform the user of your application if the product that he sees is already in his cart by using `isAddedToCart` and e.g. show the proper icon signalizing it.

```vue
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

### Cleaning a cart

Implementing cleaning feature means that you should use `clear` function like in following example:

```vue
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


### Applying and removing coupons from a cart

Using Vue Storefront allows you to apply promotional coupons to your application and also use third-party software to handle that. Using `applyCoupon` function, you can pass the code for further handling.  

```vue
<template>
  <CartComponent>
    <CouponInput
      v-model="promoCode"
    />
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
 
## Using wishlist

### Loading useWishlist into your application 

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


### Adding items to a wishlist

The product can be added to the wishlist similarly like to the cart but using `addToWishlist` function:

```vue
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

### Removing the item from the wishlist

The `wishlist` can be accessed by `wishlistGetters` object, which allows you to fetch proper values and render them in the component e.g. `wishlistGetters.getItems()` to access all items that added to the wishlist. You can see the list of all `wishlistGetters` at the end of this section [here](#list-of-available-properties-and-getters).  
You can add the possibility to remove products by `removeFromWishlist` function. 

```vue
<template>
  <WishlistComponent>
    <ProductComponent
      for="product in products"
    >
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

### Checking if the item is added to the wishlist 

If you want to show that product is already added to `wishlist`, use `isOnWishlist` function like so:

```vue
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

### Deleting all items added to wishlist

Cleaning the wishlist can be achieved by `clearWishlist` property.

```vue
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

  /* Similar features you can use on wishlist component */

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
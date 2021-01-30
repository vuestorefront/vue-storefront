# Cart and wishlist

> This page assumes you're familiar with Composition API and Composables. Read them first if you are new to these concepts.

## Introduction

This document will guide you all the way to fully implement cart and wishlist modules, which will let you use these common features in your application in the best possible way. 
Customer's cart and wishlist can be managed using `useCart` and `useWishlist` composables respectively, provided by every integration. Data can be accessed using `cartGetters` and `wishlistGetters`. 


## Using cart

### loading cart in your application

First thing you need to do to start using cart in your application is importing useCart from your ecommerce integration. In order to that `load`function must be used and all it does is fetching cart from server and create new in your application if it doesn't already exist. Basing on that you can start using `cart` object which structure depends on the ecommerce implementation you are using. 


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


### basic usage scenarios:

     * adding an item

The basic thing that user wants to do while interacting with the cart is adding an item to it. So having example application, we use `addToCart` function in order to allow user to add new product or additional items of product that is already added.   

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
After importing the `useCart` you need to get proper function and pass the product and quantity of items. `loading` is the object which includes the loading state of the element.   


     * removing an item from a cart and update quantity

The product in the cart of your application need to have some kind of remove button, so adding `removeFromCart`is needed. It can be done similarly like other `useCart` properties. 

```js
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
In above example you can see the we use getters to pass the values to the component: all products already in cart, total price, and items in cart. It's the best way to access `cart` object properties. TO make them work you need to import `cartGetters` object and use proper getter function as the computed value.   


     * checking if an item is on a cart

You can inform the user of your application if the product that he sees is already in his cart by using `isAddedToCart` and e.g. show the proper icon signalizing it.

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

Adding cleaning cart feature means that you should use `clear` function like in following example:

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


### other scenarios:
     * applying and removing coupons from a cart

Using Vue Storefront allows you to apply promotional coupons to you applicaton and use also third party software to handle that. Using `applyCoupon` function you can pass the code for further handling.  

```js
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
  import { useCart } from '@vue-storefront/{INTEGRATION}';
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
The product can be added to the wishlist similarly like to the cart but using `addToWishlist` function:

### basic usage scenarios:


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

   * removing the item from the wishlist

The `wishlist` can be accessed by `wishlistGetters` object which allows you to fetch proper values and render them in the component e.g. `wishlistGetters.getItems()` to access all items that added to wishlist. You can see the list of all `wishlistGetters` at the end of this section [here](#list-of-available-properties-and-getters).  
You can add possibility to remove products by `removeFromWishlist` function. 

```js
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

   * checking if the item is added to the wishlist 

If you want to show that product is already added to `wishlist`, use `isOnWishlist` function like so:

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

   * deleting all items added to wishlist

Cleaning the wishlist can be achived by `clearWishlist` property.

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

### common usage example

In the following two examples you can analyze how both composables are used in the simple use case. There are all above mentioned basic scenarios used In three main components: product list, cart and wishlist. It can be your basis for building real life application implementation.    

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

The cart and the wishlist components:

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

### list of available properties and getters
[list of properties and getters for useCart and useWishlist, in form of the table]


Properties

| useCart                                      | useWishlist                         | 
|----------------------------------------------|-------------------------------------|
| cart          | wishlist                 |   
| isOnCart          | isOnWishlist          |   
| addToCart         | addToWishlist                 | 
| load: loadCart | load: loadWishlist  |
| removeFromCart |removeFromWishlist  | 
| clear  | clearWishlist                                   | 
| updateQuantity   |                                    | 
| coupon   |                                    | 
| applyCoupon|  | 
| removeCoupon  |                                    | 
| loading  |                                     | 


Getters

| useCart                                      | useWishlist                         | 
|----------------------------------------------|-------------------------------------|
| getTotals          | getTotals                 |   
| getShippingPrice         | getShippingPrice                 | 
| getItems | getItems |
| getItemName | getItemName | 
| getItemImage  | getItemImage                                   | 
| getItemPrice   | getItemPrice                                    | 
| getItemQty| getItemQty | 
| getItemAttributes  | getItemAttributes                                   | 
| getItemSku  | getItemSku                                    | 
| getTotalItems   | getTotalItems                                  | 
| getFormattedPrice  | getFormattedPrice    |
| getCoupons  |    |
| getDiscounts  |    |
  
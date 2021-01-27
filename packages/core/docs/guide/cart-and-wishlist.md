# Cart and wishlist

## 1. Introduction

This document will guide you all the way to fully implement cart and wishlist modules, which will let you use these common features in your application in the best possible way. 
UseCart and useWishlist are both composables which let you manage items by its properties and getters which you can import from the certain integration.  


## 2. Using cart:
1.  installation and loading


```js
import { useCart } from '@vue-storefront/{INTEGRATION}';
import { onSSR } from '@vue-storefront/core';
export default {
  setup() {
    const {
      cart
      load,
      error
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


1.  basic usage scenarios:
[show on examples]
     * adding item
     * removing an item from a cart
     * checking if an item is on a cart
     * cleaning a cart
  
 3. other scenarios:
     * applying and removing coupons from a cart
     * guest carts 
 
## 3. Using wishlist:
1. installation and loading
1. basic usage scenarios:
[show on examples]
   * adding 
   * removing
   * checking 
   * cleaning 


## 4. Summary.
1. common usage example
 [one common example which includes basic usage scenarios]

2. list of available properties and getters
[list of properties and getters for useCart and useWishlist, in form of the table]

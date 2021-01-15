# `useWishlist`

## When to use it?

Use `useWishlist` to:
- fetch current wishlist
- add/remove/change quantity of wishlist items
- check if a product is already in the wishlist

## How to use it in your project?

```js
import { useWishlist } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { 
      wishlist,
      addToWishlist,
      removeFromWishlist,
      clearWishlist,
      isOnWishlist,
      load: loadWishlist
     } = useWishlist()
    
    onSSR(async () => {
      await loadWishlist()
    })

    return {
      wishlist,
      loading
    }
  }
}
```

# `useCart`

## When to use it?

Use `useCart` to:
- fetch current cart
- add/remove/change quantity of cart items
- apply/remove discount coupons
- check if a product is already in the cart

## How to use it in your project?

```js
import { useCart } from '{INTEGRATION}'
import { onSSR } from '@vue-storefront/core'

export default {
  setup () {
    const { 
      isOnCart,
      addToCart,
      loadCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      applyCoupon,
      removeCoupon,
      loading
     } = useCart()
    
    onSSR(async () => {
      await loadCart()
    })

    return {
      cart,
      loading
    }
  }
}
```


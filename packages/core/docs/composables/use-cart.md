# `useCart`

## When to use it?

Use `useCart` for all cart operations like adding to cart, removing from cart etc.

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


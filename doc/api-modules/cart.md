# Cart module

The cart module as name suggests is a set of mixins responsible for interacting with Cart. You can find methods responsible for adding/removing/getting cart items along with optional UI interactions for microcart.

## Content

#### addToCart
- [method] addToCart(product)

#### removeFromCart
- [method] removeFromCart(product)

#### applyCoupon
- [method] applyCoupon(code)

#### removeCoupon
- [method] removeCoupon()

#### productsInCart
- [computed] productsInCart

#### appliedCoupon
- [computed] appliedCoupon

## UI helpers

#### openMicrocart
- [method] openMicrocart()

#### closeMicrocart
- [method] openMicrocart()

#### isMicrocartOpen
- [computed] isMicrocartOpen

## Example

````javascript
// Inside Vue component
import {
  addToCart,
  removeFromCart,
  applyCoupon,
  removeCoupon,
  productsInCart,
  appliedCoupon,
  closeMicrocart,
  openMicrocart,
  isMicrocartOpen
} from '@vue-storefront/core/modules/cart/features'

export default {
  //...other properties
  mixins: [
    addToCart,
    removeFromCart,
    applyCoupon,
    removeCoupon,
    productsInCart,
    appliedCoupon,
    closeMicrocart,
    openMicrocart,
    isMicrocartOpen
  ]
}
````

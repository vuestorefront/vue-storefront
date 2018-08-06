# Cart module

The cart module as name suggests is a set of mixins responsible for interacting with Cart. You can find methods responsible for adding/removing/getting cart items along with optional UI interactions for microcart.

## Content

#### addToCart
- [method] addToCart(product)

#### removeFromCart
- [method] removeFromCart(product)

#### productsInCart
- [computed] productsInCart

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
  productsInCart,
  closeMicrocart,
  openMicrocart,
  isMicrocartOpen
} from '@vue-storefront/core/api/cart'

export default {
  //...other properties
  mixins: [
    addToCart,
    removeFromCart,
    productsInCart,
    closeMicrocart,
    openMicrocart,
    isMicrocartOpen
  ]
}
````

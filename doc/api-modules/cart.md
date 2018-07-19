# Cart module

The cart module as name suggests is a set of mixins respomnsible for interacting with Cart. You can find methods responsible for adding/removing/getting cart items along with optional UI interactions for microcart.

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
} from 'core/api/cart'

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
- [method] closeMicrocart()

#### isMicrocartOpen
- [computed] isMicrocartOpen

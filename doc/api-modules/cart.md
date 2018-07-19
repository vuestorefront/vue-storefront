# Cart module

The cart module as name suggests is a set of mixins respomnsible for interacting with Cart. You can find methods responsible for adding/removing/getting cart items along with optional UI interactions for microcart.

## Content

#### addToCart
- **[method] addToCart(product)** - adds passed product to the cart. Dispatches `cart/addItem` Vuex action

#### removeFromCart
- **[method] removeFromCart(product)** - removes passed product from the cart (basing on `sku` & `parentSku`). Dispatches `cart/removeItem` Vuex action.

#### productsInCart
- **[computed] productsInCart** - returns products in cart. Returns `cart/cartItems` Vuex state.

## UI helpers

#### openMicrocart
- **[method] openMicrocart()** - sets `microcart` and `overlay` property from ui state to `true`. Dispatches `ui/setMicrocart'` Vuex action

#### closeMicrocart
- **[method] openMicrocart()** - sets `microcart` and `overlay` property from ui state to `false`. Dispatches `ui/setMicrocart'` Vuex action

#### isMicrocartOpen
- **[computed] isMicrocartOpen** - returns `true` if Microcart is open. Retuens `ui/microcart` Vuex state.

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

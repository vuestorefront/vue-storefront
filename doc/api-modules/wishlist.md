# Wishlist module

The wishlist module as name suggests is a set of mixins responsible for interacting with Wishlist. You can find methods responsible for adding/removing/getting wishlist items along with optional UI interactions for wishlist sidebar.

## Content

#### loadWishlist
- [created hook]

#### addToWishlist
- [method] addToWishlist(product)

#### removeFromWishlist
- [method] removeFromWishlist(product)

#### clearWishlist
- [method] clearWishlist()

#### productsInWishlist
- [computed] productsInWishlist

## UI helpers

#### openWishlist
- [method] openWishlist()

#### closeWishlist
- [method] closeWishlist()

#### isWishlistOpen
- [computed] isWishlistOpen

## Example

````javascript
// Inside Vue component
import { 
  loadWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  productsInWishlist,
  openWishlist,
  closeWishlist,
  isWishlistOpen
} from 'core/api/wishlist'

export default {
  //...other properties
  mixins: [
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    productsInWishlist,
    openWishlist,
    closeWishlist,
    isWishlistOpen
  ]
}
````
<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-to-wishlist" @click="addToWishlist(product)">Add product to wishlist</button>
    <button id="remove-from-wishlist" @click="removeFromWishlist(product)">Remove product from wishlist</button>
    <button id="clear-wishlist" @click="clearWishlist">Clear wishlist</button>
    <button id="open-wishlist" @click="openWishlist">Open wishlist</button>
    <button id="close-wishlist" @click="closeWishlist">Close wishlist</button>
  </div>
</template>

<script>
// Just import the features that you need in the view grouped in modules
import { 
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  productsInWishlist,
  openWishlist,
  closeWishlist,
  isWishlistOpen
} from 'core/api/wishlist'

export default {
  data () {
    return {
      product: 'productObjectMock'
    }
  },
  // And register them as a mixins
  mixins: [
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    productsInWishlist,
    openWishlist,
    closeWishlist,
    isWishlistOpen
  ]
}
</script>

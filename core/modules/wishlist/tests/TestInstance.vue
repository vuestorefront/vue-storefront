<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-to-wishlist" @click="addToWishlist(product)">Add product to wishlist</button>
    <button id="remove-from-wishlist" @click="removeFromWishlist(product)">Remove product from wishlist</button>
    <button id="clear-wishlist" @click="clearWishlist">Clear wishlist</button>
  </div>
</template>

<script>
// Just import the features that you need in the view grouped in modules
import { AddToWishlist } from '../components/AddToWishlist'
import { WishlistProduct } from '../components/Product'
import { Wishlist } from '../components/Wishlist'

export default {
  data () {
    return {
      product: 'productObjectMock'
    }
  },
  methods: {
    clearWishlist () {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/clear') : false
    }
  },
  mixins: [
    AddToWishlist,
    WishlistProduct,
    Wishlist
  ]
}
</script>

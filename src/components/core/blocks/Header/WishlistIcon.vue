<template>
  <div class="wishlist-icon">
    Core Wishlist
    <!-- Add to Wishlist button examples with addToCart action from cart store-->
    <button v-on:click="toggleWishlistPanel">Add to Wishlist</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'wishlist-icon',
  props: ['product'],
  computed: {
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  },
  methods: {
    ...mapActions({
      'addToWishlist': 'wishlist/addItem',
      'removeFromWishlist': 'wishlist/removeItem'
    }),
    toggleWishlistPanel () {
      this.$store.commit('ui/setWishlist', !this.isOpen)
    }
  }
}
</script>

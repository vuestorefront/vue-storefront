<template>
  <div class="wishlist-icon">
    Core Wishlist
    <!-- Add to Wishlist button examples with addToCart action from cart store-->
    <button @click="toggleWishlistPanel">Add to Wishlist</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WishlistIcon',
  props: ['product'],
  computed: {
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  },
  methods: {
    toggleWishlistPanel () {
      this.$store.commit('ui/setWishlist', !this.isOpen)
    }
  }
}
</script>

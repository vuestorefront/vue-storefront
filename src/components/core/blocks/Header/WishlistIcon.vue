<template>
  <div class="wishlist-icon">
    Core Wishlist
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'wishlist-icon',
  props: ['product'],
  computed: {
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  },
  methods: {
    toggleWish () {
      this.$store.commit('ui/setWishlist', !this.isOpen)
    },
    addWish (product) {
      this.$store.dispatch('wishlist/addItem', product)
      this.toggleWish()
    },
    removeWish (product) {
      this.$store.dispatch('wishlist/removeItem', product)
      this.toggleWish()
    }
  }
}
</script>

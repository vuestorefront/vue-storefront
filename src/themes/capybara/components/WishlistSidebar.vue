<template>
  <SfSidebar
    :visible="isOpen"
    @close="onClose"
    class="sf-sidebar--right"
  >
    Wishlist:
    {{ productsInWishlist }}
  </SfSidebar>
</template>

<script>
import { SfSidebar } from '@storefrontui/vue'

export default {
  name: 'WishlistSidebar',
  computed: {
    isOpen () {
      return this.$store.state.ui.wishlist
    },
    productsInWishlist () {
      return this.$store.state.wishlist.items
    }
  },
  methods: {
    onClose () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  },
  components: {
    SfSidebar
  }
}
</script>

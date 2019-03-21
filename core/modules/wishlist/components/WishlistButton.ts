export const WishlistButton = {
  methods: {
    toggleWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}
export const WishlistButton = {
  methods: {
    toggleWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  },
  computed: {
    wishlistItemsCount () {
      return this.$store.getters['wishlist/wishlistItemCount']
    }
  }
}
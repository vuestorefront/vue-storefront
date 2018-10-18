export const Wishlist = {
  name: 'Wishlist',
  created () {
    this.$store.dispatch('wishlist/load')
  },
  computed: {
    isWishlistOpen () {
      return this.$store.state.ui.wishlist
    },
    productsInWishlist () {
      return this.$store.state.wishlist.items
    }
  },
  methods: {
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    }
  }
}

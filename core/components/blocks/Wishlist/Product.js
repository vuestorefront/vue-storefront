import { WishlistProduct } from '@vue-storefront/core/modules/wishlist/components/Product'
export default {
  name: 'Product',
  methods: {
    // depreciated
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    }
  },
  mixins: [WishlistProduct]
}

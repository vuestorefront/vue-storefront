import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const Wishlist = {
  name: 'Wishlist',
  mixins: [wishlistMountedMixin],
  created () {
    WishlistModule.register()
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
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}

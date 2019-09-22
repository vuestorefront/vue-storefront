import { Wishlist as WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'

export const IsOnWishlist = {
  name: 'isOnWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    WishlistModule.register()
  },
  computed: {
    isOnWishlist (): boolean {
      return !!this.$store.state.wishlist.items.find(p => p.sku === this.product.sku) || false
    }
  }
}

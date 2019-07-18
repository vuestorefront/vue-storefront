import { WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'
import { registerModule } from '@vue-storefront/core/lib/modules';

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
    registerModule(WishlistModule)
  },
  computed: {
    isOnWishlist (): boolean {
      return !!this.$store.state.wishlist.items.find(p => p.sku === this.product.sku) || false
    }
  }
}

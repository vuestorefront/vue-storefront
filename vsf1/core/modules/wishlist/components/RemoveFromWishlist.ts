import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { WishlistModule } from '../'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'
import { registerModule } from '@vue-storefront/core/lib/modules';

export const RemoveFromWishlist = {
  name: 'RemoveFromWishlist',
  mixins: [wishlistMountedMixin],
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      registerModule(WishlistModule)
      this.$store.dispatch('wishlist/removeItem', product)
    }
  }
}

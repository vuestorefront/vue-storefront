import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Wishlist as WishlistModule } from '../'

export const RemoveFromWishlist = {
  name: 'RemoveFromWishlist',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    removeFromWishlist (product: Product) {
      WishlistModule.register()
      this.$store.dispatch('wishlist/removeItem', product)
    }
  }
}

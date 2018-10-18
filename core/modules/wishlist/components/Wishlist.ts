import { loadWishlist, productsInWishlist, closeWishlist, isWishlistOpen } from '@vue-storefront/core/modules/wishlist/features'

export const Wishlist = {
  name: 'Wishlist',
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  mixins: [ loadWishlist, productsInWishlist, closeWishlist, isWishlistOpen ]
}

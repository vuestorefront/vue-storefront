import Product from '@vue-storefront/core/modules/catalog/types/Product'
import { Wishlist as WishlistModule } from '../'

export const AddToWishlist = {
  name: 'AddToWishlist',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  created () {
    WishlistModule.register()
  },
  methods: {
    addToWishlist (product: Product) {
      return this.$store.state['wishlist'] ? this.$store.dispatch('wishlist/addItem', product) : false
    }
  }
}

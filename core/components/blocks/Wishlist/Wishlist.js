import onEscapePress from 'core/mixins/onEscapePress'
import { loadWishlist, productsInWishlist, closeWishlist, isWishlistOpen } from 'core/api/wishlist'

export default {
  name: 'Wishlist',
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  methods: {
    onEscapePress () {
      this.closeWishlist()
    }
  },
  mixins: [ onEscapePress, loadWishlist, productsInWishlist, closeWishlist, isWishlistOpen ]
}

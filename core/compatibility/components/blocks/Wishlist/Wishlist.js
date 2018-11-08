import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { Wishlist } from '@vue-storefront/core/modules/wishlist/components/Wishlist'
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
  mixins: [ Wishlist, onEscapePress ]
}

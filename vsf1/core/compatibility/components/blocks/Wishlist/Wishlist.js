import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { Wishlist } from '@vue-storefront/core/modules/wishlist/components/Wishlist'
export default {
  name: 'Wishlist',
  props: {
    // deprecated
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  methods: {
    // theme-specific
    onEscapePress () {
      this.$store.dispatch('ui/closeWishlist')
    }
  },
  mixins: [ Wishlist, onEscapePress ]
}

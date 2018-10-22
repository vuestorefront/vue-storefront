import { WishlistButton } from '@vue-storefront/core/modules/wishlist/components/WishlistButton'
export default {
  name: 'WishlistIcon',
  mixins: [ WishlistButton ],
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  computed: {
    // depreciated in this component
    isWishlistOpen () {
      return this.$store.state.ui.wishlist
    }
  },
  methods: {
    // depreciated
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    },
    // depreciated
    openWishlist () {
      this.$store.commit('ui/setWishlist', true)
    },
    // method renamed to toggleWishlist
    toggleWishlistPanel () {
      this.toggleWishlist()
    }
  }
}

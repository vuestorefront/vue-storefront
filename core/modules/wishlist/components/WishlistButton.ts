import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'
import { mapGetters } from 'vuex'

export const WishlistButton = {
  mixins: [wishlistMountedMixin],
  computed: {
    ...mapGetters('wishlist', ['getWishlistItemsCount'])
  },
  methods: {
    toggleWishlist () {
      this.$store.dispatch('ui/toggleWishlist')
    }
  }
}

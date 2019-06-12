<template>
  <button
    type="button"
    class="inline-flex bg-cl-transparent brdr-none relative"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <i class="material-icons">favorite_border</i>
    <span
      class="whishlist-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 cl-white bg-cl-silver"
      v-cloak
      v-show="getwishlistItemsCount"
    >
      {{ getWishListQty }}
    </span>
  </button>
</template>

<script>
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'
import wishlistMountedMixin from '@vue-storefront/core/modules/wishlist/mixins/wishlistMountedMixin'
import { WishlistButton } from '@vue-storefront/core/modules/wishlist/components/WishlistButton'

export default {
  mixins: [WishlistIcon, wishlistMountedMixin, WishlistButton],
  computed: {
    getWishListQty () {
      return this.$store.state['wishlist'].items.length
    }
  }
}
</script>

<style scoped>
  .whishlist-count {
    top: 7px;
    left: 50%;
    min-width: 16px;
    min-height: 16px;
    border-radius: 10px;
  }
</style>

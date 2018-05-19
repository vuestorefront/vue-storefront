<template>
  <button
    type="button"
    class="inline-flex bg-cl-transparent brdr-none"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <i class="material-icons">favorite_border</i>
  </button>
</template>

<script>
import wishlistIcon from 'core/components/blocks/Header/WishlistIcon'

export default {
  mixins: [wishlistIcon]
}
</script>

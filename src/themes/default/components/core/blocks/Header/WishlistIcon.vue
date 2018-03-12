<template>
  <button
    type="button"
    class="inline-flex bg-cl-transparent brdr-none"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <i class="material-icons md-18">favorite_border</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/WishlistIcon')]
}
</script>

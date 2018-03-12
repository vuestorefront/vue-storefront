<template>
  <button class="wishlist-icon inline-flex bg-transparent brdr-none" @click="toggleWishlistPanel">
    <i class="material-icons md-18">favorite_border</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/WishlistIcon')]
}
</script>

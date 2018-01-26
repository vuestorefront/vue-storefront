<template>
  <div class="wishlist-icon inline-flex" @click="toggleWishlistPanel">
    <i class="material-icons md-18">favorite_border</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

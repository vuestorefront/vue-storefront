<template>
  <button @click="isOnWishlist ? removeFromWishlist(product) : addToWishlist(product)" class="p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" type="button" data-testid="addToWishlist">
    <i class="pr5 material-icons">{{ favoriteIcon }}</i>
    <template v-if="!isOnWishlist">
      {{ $t('Add to favorite') }}
    </template>
    <template v-else>
      {{ $t('Remove') }}
    </template>
  </button>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  }
}
</script>

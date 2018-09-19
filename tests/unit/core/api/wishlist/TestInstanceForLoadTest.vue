<template>

</template>

<script>
// Import the features you need in the view grouped in modules
import { loadWishlist } from '@vue-storefront/core/modules/wishlist/features'

export default {
  mixins: [
    loadWishlist
  ]
}
</script>

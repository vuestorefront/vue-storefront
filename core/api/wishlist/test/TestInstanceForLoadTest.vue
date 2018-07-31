<template>

</template>

<script>
// Just import the features that you need in the view grouped in modules
import { 
  loadWishlist
} from 'core/api/wishlist'

export default {
  mixins: [
    loadWishlist
  ]
}
</script>

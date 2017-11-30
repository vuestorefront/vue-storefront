<template>
  <div v-if="isProductPage">
    <i class="material-icons md-18 add" v-if="isWishlisted(product)" v-on:click="removeFromWishlist(product)">favorite</i>
    <i class="material-icons md-18 remove" v-else v-on:click="addFromWishlist(product)">favorite_border</i>
  </div>
  <div v-else>
    <i class="material-icons md-18" v-on:click="toggleWishlistPanel">favorite_border</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  data () {
    return {
      isProductPage: false
    }
  },
  created () {
    if (this.$route.path.includes('/p/')) {
      this.isProductPage = true
    }
  },
  watch: {
    '$route.path': function () {
      if (this.$route.path.includes('/p/')) {
        this.isProductPage = true
      } else {
        this.isProductPage = false
      }
    }
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style lang="scss" scoped>
</style>

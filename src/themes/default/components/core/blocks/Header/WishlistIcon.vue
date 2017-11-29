<template>
  <div v-if="!isProductPage">
    <i class="material-icons md-18"  @click="toggleWish">favorite_border</i>
  </div>
  <div v-else>
    <i class="material-icons md-18" v-if="isWished" @click="addWish">favorite_border</i>
    <i class="material-icons md-18" v-else @click="removeWish">favorite</i>
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
    if (this.$route.path === '/p/') {
      this.isProductPage = true
    }
  },
  watch: {
    '$route.path': function () {
      console.log('Route', this.$route.path)
      if (this.$route.path === '/p/') {
        this.isProductPage = true
      } else {
        this.isProductPage = false
      }
    }
  },
  methods: {
    isWished (product) {
      this.$store.dispatch('wishlist/getItem', product).then((isWished) => {
        return isWished.length
      })
    }
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style lang="scss" scoped>
</style>

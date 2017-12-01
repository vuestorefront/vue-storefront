<template>
  <div v-if="isProductPage">
    <i class="material-icons md-18 add" v-if="!isWishlisted(product)" v-on:click="addToWishlist(product)">favorite_border</i>
    <i class="material-icons md-18 remove" v-else v-on:click="removeFromWishlist(product)">favorite</i>
  </div>
  <div v-else>
    <i class="material-icons md-18" v-on:click="toggleWishlistPanel">favorite_border</i>
    <i class="material-icons md-18 login" @click="toggleLogin">favorite_border</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      check: 'wishlist/check'
    }),
    ...mapState({
      isOpen: state => state.ui.signUp
    })
  },
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
  methods: {
    isWishlisted (product) {
      return this.check.isOnWishlist(product)
    },
    toggleLogin () {
      this.$store.commit('ui/setSignUp', !this.isOpen)
    }
  },
  mixins: [coreComponent('core/blocks/Header/WishlistIcon')]
}
</script>

<style lang="scss" scoped>
</style>

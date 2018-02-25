<template>
  <div class="wishlist pl50 bg-primary" :class="{ active: isOpen }">
    <div class="row">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer" @click="closeWishlist">close</i>
      </div>
    </div>
    <div class="row pr50-md pl20 pr20 pl0-md" v-if="!items.length">
      <div class="col-md-12">
        <h4>Your wishlist is empty.</h4>
        <div>
          Don't hesitate and
          <router-link to="/">browse our catalog</router-link>
          to find something beatufiul for you!
        </div>
      </div>
    </div>
    <div class="row pr50-md pl20 pr20 pl0-md">
      <div class="col-md-12">
        <h1 v-if="items.length">Wishlist</h1>
        <div class="products">
          <product v-for="product in items" :key="product.id" :product="product" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'theme/node_modules/vuex'

import Product from './Product'

export default {
  name: 'Wishlist',
  created () {
    this.$store.dispatch('wishlist/load') // Load wishlist from the indexedDb
  },
  methods: {
    closeWishlist () {
      this.$store.commit('ui/setOverlay', false)
      this.$store.commit('ui/setWishlist', false)
    },
    ...mapActions({ 'removeFromWishlist': 'wishlist/removeItem' })
  },
  computed: {
    items () {
      return this.$store.state.wishlist.itemsWishlist
    },
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  },
  components: {
    Product
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/transitions';
  .wishlist {
    height: 100vh;
    width: 700px;
    top: 0;
    right: 0;
    max-width: 100%;
    position: fixed;
    z-index: 3;
    transform: translateX(100%);
    transition: transform 300ms $motion-main;
    overflow-y: auto;
    overflow-x: hidden;

    &.active {
      transform: translateX(0)
    }
  }
</style>

<template>
  <div class="wishlist" :class="{ active: isOpen }">
    Core Wishlist
    <!-- Items in wishlist -->
    <ul>
      <li v-for='product in items'>
        {{ product.name }}
        {{ product.priceInclTax }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Wishlist',
  props: ['product'],
  created () {
    this.$store.dispatch('wishlist/load') // Load wishlist from the indexedDb
  },
  methods: {
    closeWishlist () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setWishlist', false)
    },
    ...mapActions({ 'removeFromWishlist': 'wishlist/removeItem' })
  },
  computed: {
    items () {
      return this.$store.state.wishlist.wishedItems
    },
    ...mapState({
      isOpen: state => state.ui.wishlist
    })
  }
}
</script>

<template>
  <div id="home">
  <main-slider />
  <section class="container">
    <div class="row">
      <header class="col-md-12 pt40">
        <h2 class="align-center">Everything new</h2>
      </header>
    </div>
    <div class="row">
      <product-tile v-for='product in newProducts' :product="product"/>
      <product-tile v-for='product in newProducts' :product="product"/>
      <product-tile v-for='product in newProducts' :product="product"/>
    </div>
  </section>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

export default {
  computed: {
    cartItems () {
      return this.$store.state.cart.items
    },
    categories () {
      return this.$store.state.catalog.categories
    }

  },
  data () {
    return {
      newProducts: {}
    }
  },
  components: {
    ProductTile,
    MainSlider
  },
  mixins: [corePage('Home')]
}
</script>

<style scoped>

</style>

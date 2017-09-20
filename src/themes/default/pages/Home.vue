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
      <div v-for='product in products' class="col-md-3 p15">
        <product-tile :product="product"/>
      </div>
      <div v-for='product in products' class="col-md-3 p15">
        <product-tile :product="product"/>
      </div>
      <div v-for='product in products' class="col-md-3 p15">
        <product-tile :product="product"/>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="row">
      <header class="col-md-12 pt40 pb15">
        <h2 class="align-center">Autumn '17 collection</h2>
      </header>
    </div>
  </div>

  <div class="autumn-collection">
    <div class="container">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="row pb45">
          <div v-for='product in products' class="col-md-6 p15">
            <product-tile :product="product"/>
          </div>
        </div>
      </div>    
    </div>
    </div>
  </div>

  <section class="container">
    <div class="row">
      <header class="col-md-12 pt40">
        <h2 class="align-center">Get inspired</h2>
      </header>
    </div>
    <inspirations />
  </section>

  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'
import Inspirations from '../components/theme/blocks/Inspirations/Inspirations.vue'

import productData from '../resource/products.json'

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
      products: productData.data
    }
  },
  components: {
    ProductTile,
    MainSlider,
    Inspirations
  },
  mixins: [corePage('Home')]
}
</script>

<style scoped>
.autumn-collection {
  background-color: #F2F2F2;
}
</style>

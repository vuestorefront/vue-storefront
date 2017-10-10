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
      <div v-for='product in everythingNewCollection' v-bind:key='product.id' class="col-md-3 p15">
        <product-tile :product="product"/>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="row">
      <header class="col-md-12 pt40 pb15">
        <h2 class="align-center">Cool Bags of '17 collection</h2>
      </header>
    </div>
  </div>

  <div class="bg-lightgray">
    <div class="container">
    <div class="row">
      <div class="col-md-6"></div>
      <div class="col-md-6">
        <div class="row pb45">
          <div v-for='product in coolBagsCollection' v-bind:key='product.id' class="col-md-6 p15">
            <product-tile :product="product"/>
          </div>
        </div>
      </div>    
    </div>
    </div>
  </div>

  <section class="container pb60">
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
import builder from 'bodybuilder'

// Base components overwrite
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

import Inspirations from '../components/theme/blocks/Inspirations/Inspirations.vue'

export default {
  computed: {
    categories () {
      return this.$store.state.category.list
    }
  },
  data () {
    // TO-DO: Create separate blocks for all modules in homepage
    return {
      everythingNewCollection: {},
      coolBagsCollection: {}
    }
  },
  beforeMount () {
    let self = this
    let newProductsQuery = builder().query('match', 'category.name', 'Tees').build()
    let coolBagsQuery = builder().query('match', 'name', 'Bag').build()

    self.$store.dispatch('product/list', {
      query: newProductsQuery,
      size: 8,
      sort: 'created_at:desc'
    }).then(function (res) {
      self.everythingNewCollection = res.items
    })

    self.$store.dispatch('product/list', {
      query: coolBagsQuery,
      size: 8,
      sort: 'created_at:desc'
    }).then(function (res) {
      self.coolBagsCollection = res.items
    })
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
</style>

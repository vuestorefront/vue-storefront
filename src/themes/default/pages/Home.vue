<template>
  <div id="home">
  <main-slider />
  
  <section class="container">
    <div>
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
        <h2 class="align-center">Cool Stuff of '17 collection</h2>
      </header>
    </div>
  </div>

  <div class="bg-lightgray">
    <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="row pb45 pt45 center-md">
            <product-tile  v-for='product in coolBagsCollection' v-bind:key='product.id' class="col-md-3" :product="product"/>
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
    <tile-links />
  </section>

  </div>
</template>

<script>
import { corePage } from 'lib/themes'
import builder from 'bodybuilder'

// Base components overwrite
import MainSlider from '../components/core/blocks/MainSlider/MainSlider.vue'
import ProductTile from '../components/core/ProductTile.vue'

import TileLinks from '../components/theme/blocks/TileLinks/TileLinks.vue'

export default {
  computed: {
    categories () {
      return this.$store.state.category.list
    },
    everythingNewCollection () {
      return this.$store.state.homepage.new_collection
    },
    coolBagsCollection () {
      return this.$store.state.homepage.coolbags_collection
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Home ' + new Date())
      let newProductsQuery = builder().query('match', 'category.name', 'Tees').build()
      let coolBagsQuery = builder().query('match', 'category.name', 'Women').build()
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(function (res) {
          store.state.homepage.new_collection = res.items
          store.dispatch('product/list', {
            query: coolBagsQuery,
            size: 4,
            sort: 'created_at:desc'
          }).then(function (res) {
            store.state.homepage.coolbags_collection = res.items
            return resolve()
          })
        })
      })
    })
  },
  components: {
    ProductTile,
    MainSlider,
    TileLinks
  },
  mixins: [corePage('Home')]
}
</script>

<style scoped>



</style>

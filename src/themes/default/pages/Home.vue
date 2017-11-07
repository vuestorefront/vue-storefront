<template>
  <div id="home">
  <main-slider />
  
  <section class="container">
    <div>
      <header class="col-md-12 pt40">
        <h2 class="align-center">Everything new</h2>
      </header>
    </div>
    <div class="row center-xs">
      <div v-for='(product, key) in everythingNewCollection' v-bind:key='product.id' class="col-md-3">
        <product-tile :instant='key < 7 ? true : false' :product="product"/>
      </div>
    </div>
  </section>

  <div class="container">
    <div class="row center-xs">
      <header class="col-md-12 pt40 pb15">
        <h2 class="align-center">Cool Stuff of '17 collection</h2>
      </header>
    </div>
  </div>

  <div class="bg-lightgray">
    <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="row pb45 pt45 center-xs">
            <product-tile  v-for='product in coolBagsCollection' v-bind:key='product.id' class="col-md-3" :product="product"/>
        </div>
      </div>    
    </div>
    </div>
  </div>

    <collection title="New Luma Yoga Collection" coverImage="/assets/collection.jpg" category="Women"></collection>

  <section class="container pb60">
    <div class="row center-xs">
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
import Collection from '../components/theme/blocks/Collection/Collection'

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
    TileLinks,
    Collection
  },
  mixins: [corePage('Home')]
}
</script>

<style scoped>



</style>

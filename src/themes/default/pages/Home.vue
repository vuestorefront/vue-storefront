<template>
  <div id="home">
  <main-slider />
  
  <section class="container px15">
    <div>
      <header class="col-md-12 pt40">
        <h2 class="align-center c-black">Everything new</h2>
      </header>
    </div>
    <div class="row center-xs">
      <div v-for='(product, key) in everythingNewCollection' v-bind:key='product.id' class="col-xs-6 col-md-3">
        <product-tile :instant='key < 4 ? true : false' :product="product"/>
      </div>
    </div>
  </section>

  <collection title="New Luma Yoga Collection" coverImage="/assets/collection.jpg" category="Women"></collection>

  <section class="container pb60">
    <div class="row center-xs">
      <header class="col-md-12 pt40">
        <h2 class="align-center c-black">Get inspired</h2>
      </header>
    </div>
    <tile-links />
  </section>
  <Onboard/>
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
import Onboard from '../components/theme/blocks/Home/Onboard.vue'

export default {
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
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
      let newProductsQuery = builder().query('match', 'category.name', 'Tees').andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()
      let coolBagsQuery = builder().query('match', 'category.name', 'Women').andFilter('range', 'visibility', { 'gte': 3, 'lte': 4 }/** Magento visibility in search & categories */).build()
      store.dispatch('category/list', {}).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc'
        }).then(function (res) {
          if (res) {
            store.state.homepage.new_collection = res.items
          }

          store.dispatch('product/list', {
            query: coolBagsQuery,
            size: 4,
            sort: 'created_at:desc'
          }).then(function (res) {
            if (res) {
              store.state.homepage.coolbags_collection = res.items
            }
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
    Collection,
    Onboard
  },
  mixins: [corePage('Home')]
}
</script>

<style lang="scss" scoped>
  .cool-stuff-collection {
    mix-blend-mode: darken;
  }
</style>

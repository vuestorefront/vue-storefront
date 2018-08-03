<template>
  <div id="home">
    <main-slider />

    <promoted-offers/>

    <section class="new-collection container px15">
      <div>
        <header class="col-md-12">
          <h2 class="align-center cl-accent">{{ $t('Everything new') }}</h2>
        </header>
      </div>
      <div class="row center-xs">
        <product-listing columns="4" :products="everythingNewCollection" />
      </div>
    </section>

    <collection :title="$t('New Luma Yoga Collection')" cover-image="/assets/collection.jpg" category="Women"/>

    <section class="container pb60 px15">
      <div class="row center-xs">
        <header class="col-md-12 pt40">
          <h2 class="align-center cl-accent">{{ $t('Get inspired') }}</h2>
        </header>
      </div>
      <tile-links />
    </section>
    <Onboard/>

  </div>
</template>

<script>
// 3rd party dependecies
import builder from 'bodybuilder'

// Core dependecies
import config from 'config'

// Core pages
import Home from 'core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import MainSlider from 'theme/components/core/blocks/MainSlider/MainSlider'

// Theme local components
import Collection from 'theme/components/theme/blocks/Collection/Collection'
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'

export default {
  mixins: [Home],
  components: {
    Collection,
    MainSlider,
    Onboard,
    ProductListing,
    PromotedOffers,
    TileLinks
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
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  beforeMount () {
    if (global.$VS.__DEMO_MODE__) {
      this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' }).then((onboardingClaim) => {
        if (!onboardingClaim) { // show onboarding info
          this.$bus.$emit('modal-toggle', 'modal-onboard')
          this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
        }
      })
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    return new Promise((resolve, reject) => {
      console.log('Entering asyncData for Home ' + new Date())
      let newProductsQuery = builder().query('match', 'category.name', 'Tees').andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }/** Magento visibility in search & categories */).build()
      let coolBagsQuery = builder().query('match', 'category.name', 'Women').andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }/** Magento visibility in search & categories */).build()
      store.dispatch('category/list', { includeFields: config.entities.optimize ? config.entities.category.includeFields : null }).then((categories) => {
        store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc',
          includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
        }).then(function (res) {
          if (res) {
            store.state.homepage.new_collection = res.items
          }

          store.dispatch('product/list', {
            query: coolBagsQuery,
            size: 4,
            sort: 'created_at:desc',
            includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
          }).then(function (res) {
            if (res) {
              store.state.homepage.coolbags_collection = res.items
            }
            return resolve()
          })
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  .new-collection {
    @media (max-width: 767px) {
      padding-top: 0;
    }
  }
</style>

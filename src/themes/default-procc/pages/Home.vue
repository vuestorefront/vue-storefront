<template>
  <div id="home">
    <head-image />
    <store-categories v-if="!isDefaultStore" />
    <section class="container pb60 px15" v-if="!isDefaultStore">
      <div class="row center-xs">
        <header class="col-md-12 pt40">
          <h2 class="align-center cl-accent">
            {{ $t('New Product Arrivals') }}
          </h2>
        </header>
      </div>
      <tile-links />
    </section>
    <available-store v-if="isDefaultStore" />
  </div>
</template>

<script>
// query constructor
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import HeadImage from 'theme/components/core/blocks/MainSlider/HeadImage'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import AvailableStore from 'theme/components/theme/blocks/Store/AvailableStore'
import StoreCategories from 'theme/components/theme/blocks/StoreCategories/StoreCategories'
// import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters } from 'vuex'

export default {
  mixins: [Home],
  components: {
    HeadImage,
    AvailableStore,
    Onboard,
    ProductListing,
    StoreCategories,
    // PromotedOffers,
    TileLinks
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    categories () {
      return this.getCategories
    },
    everythingNewCollection () {
      return this.$store.state.homepage.new_collection
    },
    coolBagsCollection () {
      return this.$store.state.homepage.coolbags_collection
    },
    isDefaultStore () {
      const storeView = currentStoreView()
      return storeView.storeCode === ''
    },
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
  },
  beforeUpdate () {
    this.sortBanners()
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' })
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
    console.log('Current Store', currentStoreView())
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    const config = store.state.config
    Logger.info('Calling asyncData in Home (theme)')()

    let newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })
    let coolBagsQuery = prepareQuery({ queryConfig: 'coolBags' })

    const newProductsResult = await store.dispatch('product/list', {
      query: newProductsQuery,
      size: 8,
      sort: 'created_at:desc'
    })
    if (newProductsResult) {
      store.state.homepage.new_collection = newProductsResult.items
    }

    const coolBagsResult = await store.dispatch('product/list', {
      query: coolBagsQuery,
      size: 4,
      sort: 'created_at:desc',
      includeFields: config.entities.optimize ? (config.products.setFirstVarianAsDefaultInURL ? config.entities.productListWithChildren.includeFields : config.entities.productList.includeFields) : []
    })
    if (coolBagsResult) {
      store.state.homepage.coolbags_collection = coolBagsResult.items
    }

    await store.dispatch('procc/updateHeadImage')
    await store.dispatch('procc/updateStoreCategories')
    await store.dispatch('policies/updateStorePolicies')
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm => {
        let newProductsQuery = prepareQuery({ queryConfig: 'newProducts' })
        vm.$store.dispatch('product/list', {
          query: newProductsQuery,
          size: 8,
          sort: 'created_at:desc'
        })
      })
    } else {
      next()
    }
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

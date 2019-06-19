<template>
  <div id="home">
    <head-image />

    <promoted-offers />

    <section class="new-collection container px15" v-if="everythingNewCollection && everythingNewCollection.length">
      <div>
        <header class="col-md-12">
          <h2 class="align-center cl-accent">
            {{ $t('Everything new') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <product-listing columns="4" :products="everythingNewCollection" />
      </div>
    </section>

    <section v-if="isOnline" class="container pb60 px15">
      <div class="row center-xs">
        <header class="col-md-12" :class="{ pt40: everythingNewCollection && everythingNewCollection.length }">
          <h2 class="align-center cl-accent">
            {{ $t('Get inspired') }}
          </h2>
        </header>
      </div>
      <tile-links />
    </section>
    <Onboard />
  </div>
</template>

<script>
// query constructor
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'

// Core pages
import Home from '@vue-storefront/core/pages/Home'

// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
import HeadImage from 'theme/components/core/blocks/MainSlider/HeadImage'

// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters } from 'vuex'
import config from 'config'

export default {
  mixins: [Home],
  components: {
    HeadImage,
    Onboard,
    ProductListing,
    PromotedOffers,
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
    isOnline () {
      return onlineHelper.isOnline
    }
  },
  created () {
    // Load personal and shipping details for Checkout page from IndexedDB
    this.$store.dispatch('checkout/load')
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
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
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

    await store.dispatch('promoted/updateHeadImage')
    await store.dispatch('promoted/updatePromotedOffers')
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

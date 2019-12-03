<template>
  <main class="t-bg-base-lightest">
    <div id="category">
      <div class="t-container">
        <div class="t-flex t-flex-wrap t-px-4 t-mb-8">
          <div class="t-flex t-flex-wrap t-items-center t--mx-1 lg:t--mx-2">
            <h1 class="lg:t-block t-w-3/4 t-px-1 lg:t-px-2 t-my-4 t-font-light t-text-2xl t-text-base-dark">
              {{ category.name }}
            </h1>
          </div>
        </div>
      </div>
      <div class="t-container">
        <div class="">
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h4 data-testid="noProductsInfo">
              {{ $t('No products found!') }}
            </h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <product-listing columns="4" :products="products" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>

import Category from '@vue-storefront/core/pages/Category' // theme = default/base theme
import ProductListing from '../components/core/ProductListing.vue'

export default {
  components: {
    ProductListing
  },
  data () {
    return {
      mobileFilters: false
    }
  },
  asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    context.output.template = 'amp'
    context.output.appendHead = (context) => {
      return '<script async src="https://cdn.ampproject.org/v0.js"><' + '/script>'
    }
    return new Promise((resolve, reject) => {
      store.dispatch('category/mergeSearchOptions', { // this is just an example how can you modify the search criteria in child components
        sort: 'updated_at:desc'
        // searchProductQuery: builder().query('range', 'price', { 'gt': 0 }).andFilter('range', 'visibility', { 'gte': 2, 'lte': 4 }) // this is an example on how to modify the ES query, please take a look at the @vue-storefront/core/helpers for refernce on how to build valid query
      })
      resolve()
    })
  },
  methods: {
    openFilters () {
      this.mobileFilters = true
    },
    closeFilters () {
      this.mobileFilters = false
    }
  },
  mixins: [Category]
}
</script>

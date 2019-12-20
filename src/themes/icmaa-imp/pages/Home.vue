<template>
  <div id="home" class="t-container">
    <teaser tags="2" class="sm:t-pt-4 t-pb-8" />
    <teaser tags="2" :show-large="false" :show-small-in-row="true" class="t-pb-8" />
    <lazy-hydrate when-idle>
      <div class="t-flex t-flex-wrap t-px-4 t--mx-4 t-pb-4">
        <logo-line :parent-id="16" path="/merchandise" :title="'Bands'" class="t-mb-4 lg:t-mb-0" />
        <logo-line :parent-id="14" path="/streetwear" :title="'Brands'" />
      </div>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <product-listing-widget :category-id="3278" />
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <product-listing-widget :category-id="79" sort="price:asc" />
    </lazy-hydrate>
  </div>
</template>

<script>
import config from 'config'
import { onlineHelper } from '@vue-storefront/core/helpers'

import LazyHydrate from 'vue-lazy-hydration'
import Teaser from 'theme/components/core/blocks/Teaser/Teaser'
import LogoLine from 'theme/components/core/blocks/CategoryExtras/LogoLineBlock'
import ProductListingWidget from 'theme/components/core/ProductListingWidget'

export default {
  components: {
    LazyHydrate,
    Teaser,
    LogoLine,
    ProductListingWidget
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) {
      this.$bus.$emit('modal-show', 'modal-signup')
    }
  }
}
</script>

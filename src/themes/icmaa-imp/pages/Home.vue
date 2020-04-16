<template>
  <div id="home" class="t-container">
    <teaser tags="2" :limit="3" class="sm:t-pt-4 t-pb-8" />
    <teaser tags="21" :show-large="false" :show-small-in-row="true" class="t-pb-8" />
    <teaser tags="20" :show-large="false" :show-small-in-row="true" class="t-pb-8" />
    <lazy-hydrate when-idle>
      <div class="t-flex t-flex-wrap t-px-4 t--mx-4 t-pb-4">
        <logo-line :parent-id="16" path="/merchandise" :title="'Bands'" class="t-mb-4 lg:t-mb-0" />
        <logo-line :parent-id="14" path="/streetwear" :title="'Brands'" />
      </div>
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <product-listing-widget :category-id="3278" :filter="{ department: 6 }" />
    </lazy-hydrate>
    <lazy-hydrate when-visible>
      <product-listing-widget :category-id="3278" :filter="{ department: 5 }" />
    </lazy-hydrate>
    <cms-block identifier="home-seo" class="t-mb-8 t-px-4 t-text-sm" />
  </div>
</template>

<script>
import config from 'config'
import { onlineHelper } from '@vue-storefront/core/helpers'

import LazyHydrate from 'vue-lazy-hydration'
import Teaser from 'theme/components/core/blocks/Teaser/Teaser'
import LogoLine from 'theme/components/core/blocks/CategoryExtras/LogoLineBlock'
import ProductListingWidget from 'icmaa-category/components/core/ProductListingWidget'
import CmsBlock from 'icmaa-cms/components/Block'

export default {
  components: {
    LazyHydrate,
    Teaser,
    LogoLine,
    ProductListingWidget,
    CmsBlock
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) {
      this.$bus.$emit('modal-show', 'modal-signup')
    }
  },
  async asyncData ({ context }) {
    if (context) {
      context.output.cacheTags
        .add('home')
        .add('cms')
    }
  }
}
</script>

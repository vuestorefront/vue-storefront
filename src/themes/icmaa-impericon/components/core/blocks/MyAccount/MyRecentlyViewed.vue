<template>
  <div class="mb35">
    <div class="row mb15">
      <div class="col-xs-12 col-sm-6">
        <h3 class="m0 mb5">
          {{ $t('My Recently viewed products') }}
        </h3>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12" v-if="items && items.length > 0">
        <product-listing columns="3" :products="items" />
      </div>
      <div class="col-xs-12 h4" v-else>
        <p>{{ $t('No products yet') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RecentlyViewed from '@vue-storefront/core/modules/recently-viewed/components/RecentlyViewed'
import ProductListing from 'theme/components/core/ProductListing.vue'

export default {
  mixins: [RecentlyViewed],
  components: {
    ProductListing
  }
}
</script>

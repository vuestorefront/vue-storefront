<template>
  <div class="t-flex t-flex-wrap t--mx-2">
    <div class="t-hidden lg:t-block lg:t-w-1/3 t-px-2 t-mb-4">
      <product-tile :product="product" />
    </div>
    <div class="t-w-full lg:t-w-2/3 t-px-2">
      <div class="t-p-4 t-bg-white">
        <router-link :to="productLink" :title="product.name" class="t-block t-mb-4 t-text-primary t-text-lg">
          {{ translatedProductName }}
        </router-link>
        <review-form :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import ProductNameMixin from 'icmaa-catalog/mixins/ProductNameMixin'
import ProductTile from 'theme/components/core/ProductTile'
import ReviewForm from 'theme/components/core/blocks/Reviews/ReviewsForm'

export default {
  name: 'MyOrderReviewProduct',
  mixins: [ ProductNameMixin ],
  components: {
    ProductTile,
    ReviewForm
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    }
  }
}
</script>

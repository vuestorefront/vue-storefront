<template>
  <div class="row p25 between-xs">
    <div class="blend">
      <product-image :image="image" />
    </div>
    <div class="col-xs">
      <div class="row">
        <div class="col-xs-12 col-md-9 pb15">
          <div class="mb15">
            <div class="h4 weight-400 cl-accent serif">
              {{ product.name | htmlDecode }}
            </div>
            <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
              {{ product.errors | formatProductMessages }}
            </div>
            <div class="h5 cl-tertiary pt5">
              {{ product.sku }}
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-if="product.totals && product.totals.options">
              <div v-for="opt in product.totals.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
            <div class="h6 cl-bg-tertiary pt5 options" v-else-if="product.options">
              <div v-for="opt in product.options" :key="opt.label">
                <span class="opn">{{ opt.label }}: </span>
                <span class="opv" v-html="opt.value" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <span class="h5 cl-secondary">
                {{ $t('Qty') }}
                <span class="weight-700">
                  {{ product.qty }}
                </span>
              </span>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-md-3 serif">
          <div v-if="isOnline && product.totals">
            <span class="h4 cl-error" v-if="product.totals.discount_amount">{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price(storeView) }} </span>
            <span class="price-original h5" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax | price(storeView) }}</span>
            <span v-if="!product.totals.discount_amount" class="h4">{{ product.totals.row_total_incl_tax | price(storeView) }}</span>
          </div>
          <div v-else>
            <span class="h4 cl-error" v-if="product.special_price">{{ product.price_incl_tax * product.qty | price(storeView) }} </span>
            <span class="price-original h5" v-if="product.special_price">{{ product.original_price_incl_tax * product.qty | price(storeView) }}</span>
            <span v-if="!product.special_price" class="h4">{{ product.price_incl_tax * product.qty | price(storeView) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ProductImage from 'theme/components/core/ProductImage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  computed: {
    storeView () {
      return currentStoreView()
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  mixins: [Product],
  components: {
    ProductImage
  }
}
</script>

<style scoped>
.price-original {
  text-decoration: line-through;
}
.blend {
  flex: 0 0 121px;
}
</style>

<template>
  <div class="mb40 price serif">
    <div
      class="h3 cl-secondary"
      v-if="initialPrice.special && price.default && price.original"
    >
      <span
        class="h2 cl-mine-shaft weight-700"
      >{{ price.special | price(storeView) }}</span>&nbsp;
      <span
        class="price-original h3"
      >{{ price.original | price(storeView) }}</span>
    </div>
    <div
      class="h2 cl-mine-shaft weight-700"
      v-if="!initialPrice.special && price.default"
    >
      {{ price.default | price(storeView) }}
    </div>
  </div>
</template>
<script>
import { getCustomOptionValues, getCustomOptionPriceDelta } from '@vue-storefront/core/modules/catalog/helpers/customOption'
import { getBundleOptionsValues, getBundleOptionPrice } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import get from 'lodash-es/get'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  name: 'ProductPrice',
  props: {
    product: {
      type: Object,
      default: () => ({})
    },
    customOptions: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    bundleOptionsPrice () {
      const allBundeOptions = this.product.bundle_options || []
      const selectedBundleOptions = Object.values(get(this.product, 'product_option.extension_attributes.bundle_options', {}))
      const price = getBundleOptionPrice(
        getBundleOptionsValues(selectedBundleOptions, allBundeOptions)
      )
      return price
    },
    customOptionsPriceDelta () {
      const priceDelta = getCustomOptionPriceDelta(
        getCustomOptionValues(Object.values(this.customOptions), this.product.custom_options || []),
        this.product
      )

      return priceDelta
    },
    price () {
      const customOptionPrice = this.customOptionsPriceDelta.priceInclTax
      const special = (this.initialPrice.default + customOptionPrice) * this.product.qty
      const original = (this.initialPrice.original + customOptionPrice) * this.product.qty
      const defaultPrice = this.product.qty > 0
        ? (this.initialPrice.default + customOptionPrice) * this.product.qty
        : this.initialPrice.default

      if (this.bundleOptionsPrice.priceInclTax > 0) {
        return {
          special,
          original,
          default: this.bundleOptionsPrice.priceInclTax
        }
      }

      return {
        special,
        original,
        default: defaultPrice
      }
    },
    initialPrice () {
      return {
        default: this.product.price_incl_tax || this.product.priceInclTax || 0,
        original: this.product.original_price_incl_tax || this.product.originalPriceInclTax || 0,
        special: this.product.special_price || this.product.specialPrice || 0
      }
    },
    storeView () {
      return currentStoreView()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
.price-original {
  text-decoration: line-through;
}

.price {
  @media (max-width: 767px) {
    color: $color-primary;
  }
}
</style>

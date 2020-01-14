<template>
  <div class="mb40 price serif">
    <div
      class="h3 cl-secondary"
      v-if="product.special_price && product.price_incl_tax && product.original_price_incl_tax"
    >
      <span
        class="h2 cl-mine-shaft weight-700"
      >{{ price.special | price }}</span>&nbsp;
      <span
        class="price-original h3"
      >{{ price.original | price }}</span>
    </div>
    <div
      class="h2 cl-mine-shaft weight-700"
      v-if="!product.special_price && product.price_incl_tax"
    >
      {{ price.default | price }}
    </div>
  </div>
</template>
<script>
import { getCustomOptionValues, getCustomOptionPriceDelta } from '@vue-storefront/core/modules/catalog/helpers/customOption'
import { getBundleOptionsValues, getBundleOptionPrice } from '@vue-storefront/core/modules/catalog/helpers/bundleOptions'
import get from 'lodash-es/get'

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
        getCustomOptionValues(Object.values(this.customOptions), this.product.custom_options),
        this.product
      )

      return priceDelta
    },
    price () {
      const special = (this.product.price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
      const original = (this.product.original_price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
      const defaultPrice = this.product.qty > 0
        ? (this.product.price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
        : this.product.price_incl_tax

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

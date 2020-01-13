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
import { mapGetters } from 'vuex'

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
    customOptionsPriceDelta () {
      const allCustomOptions = this.product.custom_options
      const priceDelta = Object.values(this.customOptions).reduce((delta, currentCustomOption) => {
        if (!currentCustomOption.option_value) return delta
        const { values = [] } = allCustomOptions.find(customOption => String(customOption.option_id) === String(currentCustomOption.option_id)) || {}
        currentCustomOption.option_value.split(',').forEach(id => {
          const currentValue = values.find(value => String(value.option_type_id) === id)
          if (!currentValue) return delta
          if (currentValue.price_type === 'fixed' && currentValue.price !== 0) {
            delta.price += currentValue.price
            delta.priceInclTax += currentValue.price
          }
          if (currentValue.price_type === 'percent' && currentValue.price !== 0) {
            delta.price += ((currentValue.price / 100) * this.product.price)
            delta.priceInclTax += ((currentValue.price / 100) * this.product.price_incl_tax)
          }
        })
        return delta
      }, {
        price: 0,
        priceInclTax: 0
      })
      return priceDelta
    },
    price () {
      const special = (this.product.price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
      const original = (this.product.original_price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
      const defaultPrice = this.product.qty > 0
        ? (this.product.price_incl_tax + this.customOptionsPriceDelta.priceInclTax) * this.product.qty
        : this.product.price_incl_tax
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

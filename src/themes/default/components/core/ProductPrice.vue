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
      const priceDelta = Object.values(this.customOptions)
        .filter(customOptionIds => customOptionIds.option_value) // remove null | undefined values
        .map(customOptionIds => {
          const { values = [] } = this.product.custom_options.find(
            customOption => String(customOption.option_id) === String(customOptionIds.option_id) // get all custom option values based on 'option_id'
          )
          const customOptionValues = customOptionIds.option_value
            .split(',') // split ids, because there can be '1,2' for checkbox
            .map(optionValueId => values.find(value => String(value.option_type_id) === optionValueId)) // get custom option value based on selected option value id
            .filter(Boolean) // remove falsy results

          return customOptionValues
        })
        .reduce((allCustomOptionValues, customOptionValue) => allCustomOptionValues.concat(customOptionValue), []) // merge all values in one array
        .reduce((delta, customOptionValue) => {
          if (customOptionValue.price_type === 'fixed' && customOptionValue.price !== 0) {
            delta.price += customOptionValue.price
            delta.priceInclTax += customOptionValue.price
          }
          if (customOptionValue.price_type === 'percent' && customOptionValue.price !== 0) {
            delta.price += ((customOptionValue.price / 100) * this.product.price)
            delta.priceInclTax += ((customOptionValue.price / 100) * this.product.price_incl_tax)
          }
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

<template>
  <div class="product-listing row m0 center-xs start-md">
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="col-sm-6 flex"
      :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)]"
    >
      <product-tile :product="product" />
    </div>
  </div>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing'
import ProductTile from './ProductTile'
let lastHero = 0
export default {
  components: {
    ProductTile
  },
  mixins: [ProductListing],
  props: {
    products: {
      type: null,
      required: true
    },
    columns: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    wide (isOnSale, isNew, index) {
      let deltaCondition = index > 0 && ((index - 1) - lastHero) % 2 === 0
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && (index - lastHero) % 2 !== 0)
      if (isHero) {
        lastHero = index
      }
      return isHero ? 'col-xs-12' : 'col-xs-6'
    }
  }
}
</script>

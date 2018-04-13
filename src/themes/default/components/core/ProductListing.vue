<template>
  <div class="product-listing row m0 center-xs start-md">
    <div
      v-for="(product, key) in products"
      :key="product.id"
      class="pb10 col-sm-6"
      :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)]"
    >
      <product-tile :product="product" :instant="key < 6 ? true : false" />
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import ProductTile from './ProductTile.vue'
let lastHero = 0

export default {
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
  components: {
    ProductTile
  },
  data () {
    return {
      lastHero: 0
    }
  },
  mixins: [coreComponent('ProductListing')],
  methods: {
    wide (isOnSale, isNew, index) {
      let deltaCondition = ((index - lastHero) % 2 === 0)
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && deltaCondition)
      if (isHero) lastHero = index + 1
      return isHero ? 'col-xs-12' : 'col-xs-6'
    }
  }
}
</script>

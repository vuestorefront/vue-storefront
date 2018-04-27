<template>
  <div class="product-listing row m0 center-xs start-md">
    <div
      v-for="(product, key) in sortedProducts"
      :key="product.id"
      class="col-sm-6 flex"
      :class="['col-md-' + (12/columns)%10, wide(product.sale, product.new, key)]"
    >
      <product-tile :product="product" :instant="false" />
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
  computed: {
    sortedProducts () {
      if (this.$store.state.category.sortBy === '1') {
        return this.sortPriceLowToHigh()
      }
      if (this.$store.state.category.sortBy === '2') {
        return this.sortPriceHighToLow()
      }
      if (this.$store.state.category.sortBy === '3') {
        return this.sortNewestFirst()
      }
      if (this.$store.state.category.sortBy === '4') {
        return this.sortSaleFirst()
      }
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
      let deltaCondition = index > 0 && ((index - 1) - lastHero) % 2 === 0
      // last image always shouldn't be big, we also need to count from last promoted to check if it will look ok
      let isHero = ((isOnSale === '1' || isNew === '1') && deltaCondition) || (index === this.products.length - 1 && (index - lastHero) % 2 !== 0)
      if (isHero) {
        lastHero = index
      }
      return isHero ? 'col-xs-12' : 'col-xs-6'
    },
    sortPriceLowToHigh () {
      const products = Array.from(this.products)
      return products.sort((a, b) => {
        return a.price - b.price
      })
    },
    sortPriceHighToLow () {
      const products = Array.from(this.products)
      return products.sort((a, b) => {
        return b.price - a.price
      })
    },
    sortNewestFirst () {
      const products = Array.from(this.products)
      return products.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
    },
    sortSaleFirst () {
      const products = Array.from(this.products)
      return products.sort((a, b) => {
        return b.sale - a.sale
      })
    }
  }
}
</script>

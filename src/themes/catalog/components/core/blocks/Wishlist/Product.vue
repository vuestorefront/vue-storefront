<template>
  <div class="row py30 b-bottom">
    <div class="image flex col-xs-5 col-md-2 middle-xs">
      <img v-lazy="thumbnail" >
    </div>
    <div class="col-md-10 col-xs-7 pl40 pb15 pt15 middle-xs">
      <div class="fs-medium row extrabold">
        {{ product.name | htmlDecode }}
      </div>
      <div class="row mt10 fs-medium">
        <span class="price-special" v-if="product.special_price">
          {{ product.priceInclTax | price }}
        </span>
        <span class="price-original" v-if="product.special_price">
          {{ product.originalPriceInclTax | price }}
        </span>
        <span v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
      </div>
      <div class="row mt30">
        <div
          class="py10 px20 bg-secondary c-on-secondary inline-flex pointer bg-secondary-hover"
          @click="removeItem"
        >
          Remove Item
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from 'core/components/blocks/Wishlist/Product'

export default {
  mixins: [Product],
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    removeItem () {
      this.$store.dispatch('wishlist/removeItem', this.product)
    }
  }
}
</script>

<style scoped>

.image img {
  max-width: 100%;
}

</style>

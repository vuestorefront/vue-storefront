<template>
  <div>
    <div class="row pr55 pt20 pb20">
      <div>
        <img v-lazy="thumbnail" />
      </div>
      <div class="col-xs flex pl40 pb15 pt15">
        <div>
          <div>{{ product.name | htmlDecode}}</div>
          <div class="h6 c-lightgray pt5">{{ product.sku }}</div>
        </div>
      </div>
      <div class="col-xs flex pb15 pt15 align-right">
        <div>
          <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>&nbsp;
          <span class="price-original" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>

          <span v-if="!product.special_price" >{{ product.priceInclTax | price }}</span>
        </div>
        <div>
          <div class="mt5"><span @click="removeItem"><remove-button class="c-darkgray" /></span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import RemoveButton from './RemoveButton'

export default {
  data () {
    return {
      qty: 1
    }
  },
  methods: {
    removeItem () {
      this.$store.dispatch('wishlist/removeItem', this.product)
    }
  },
  components: {
    RemoveButton
  },
  mixins: [coreComponent('core/blocks/Wishlist/Product')]
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
  justify-content: space-between;
}
.hidden {
  display: none;
}
input {
  width: 30px;
}
</style>

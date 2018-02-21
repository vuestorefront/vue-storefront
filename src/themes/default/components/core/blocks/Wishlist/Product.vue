<template>
  <li class="row pr55 py20">
    <div>
      <img v-lazy="thumbnail" >
    </div>
    <div class="col-xs between-xs flex pl40 py15">
      <div>
        <router-link :to="{
          name: product.type_id + '-product',
          params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }
        }">
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="h6 c-lightgray pt5">{{ product.sku }}</div>
      </div>
    </div>
    <div class="col-xs flex py15 align-right">
      <div>
        <span class="price-special" v-if="product.special_price">{{ product.priceInclTax | price }}</span>&nbsp;
        <span class="price-original" v-if="product.special_price" >{{ product.originalPriceInclTax | price }}</span>

        <span v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
      </div>
      <div>
        <div class="mt5"><span @click="removeItem"><remove-button class="c-darkgray" /></span></div>
      </div>
    </div>
  </li>
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
  mixins: [coreComponent('blocks/Wishlist/Product')]
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
</style>

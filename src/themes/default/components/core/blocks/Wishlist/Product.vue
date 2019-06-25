<template>
  <li class="row pr55 py20">
    <div class="image" @click="closeWishlist">
      <router-link :to="productLink">
        <img v-lazy="thumbnail">
      </router-link>
    </div>
    <div class="col-xs between-xs flex pl40 py15">
      <div @click="closeWishlist">
        <router-link :to="productLink">
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="h6 cl-bg-tertiary pt5 sku">
          {{ product.sku }}
        </div>
      </div>
    </div>
    <div class="col-xs flex py15 align-right">
      <div>
        <span class="price-special" v-if="product.special_price">{{ product.price_incl_tax | price }}</span>&nbsp;
        <span class="price-original" v-if="product.special_price">{{ product.originalPriceInclTax | price }}</span>

        <span v-if="!product.special_price">
          {{ product.price_incl_tax | price }}
        </span>
      </div>
      <div>
        <div class="mt5">
          <span @click="removeFromWishlist(product)"><remove-button class="cl-accent" /></span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'

import RemoveButton from './RemoveButton'

export default {
  components: {
    RemoveButton
  },
  mixins: [Product],
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  }
}
</script>

<style scoped>
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
.image{
  flex: 0 0 121px;
}
</style>

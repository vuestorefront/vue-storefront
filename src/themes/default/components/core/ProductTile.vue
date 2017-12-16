<template>
  <div class="product align-center p15">
    <router-link :to="{ name: product.type_id + '-product', params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }}">
      <div class="product-image">
        <transition name="fade" appear>
          <img v-if="instant" :src="thumbnail" :key="thumbnail"/>
          <img v-if="!instant" v-lazy="thumbnail" :key="thumbnail"/>
        </transition>
      </div>
      <p class="mb0">{{ product.name | htmlDecode }}</p>

      <span class="price-special lh30 c-gray" v-if="product.special_price">{{ product.priceInclTax | price }}</span>
      <span class="price-original lh30 c-gray" v-if="product.special_price">{{ product.originalPriceInclTax | price }}</span>

      <span class="lh30 c-gray" v-if="!product.special_price" >{{ product.priceInclTax | price }}</span>
    </router-link>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  props: ['instant'],
  mixins: [coreComponent('core/ProductTile')],
  created () {
    this.$bus.$on('product-after-configured', (config) => {
      this.$store.dispatch('product/configure', { product: this.product, configuration: config.configuration, selectDefaultVariant: false }).then((selectedVariant) => {
        if (selectedVariant) {
          this.product.parentSku = this.product.sku
          Object.assign(this.product, selectedVariant)
        }
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~src/themes/default/css/transitions';

.price-special {
  color: red;
  margin-right: 5px
}
.price-original {
  text-decoration: line-through;
  font-size: smaller
}

.product-image > img {
  max-width: 242px;
  height: 100%;
  transition: 0.3s all $motion-main;
}
.product-image:hover > img {
  transform: scale(1.1);
  transition: 0.3s all $motion-main;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
  overflow: hidden;
}
</style>

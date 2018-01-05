<template>
  <div class="product align-center p15">
    <span @click.capture="preventClicks">
      <router-link :to="{ name: product.type_id + '-product', params: { parentSku: product.parentSku ? product.parentSku : product.sku, slug: product.slug, childSku: product.sku }}">
        <div class="product-image">
          <transition name="fade" appear>
            <img v-if="instant" :src="thumbnail" :key="thumbnail"/>
            <img v-if="!instant" v-lazy="thumbnail" :key="thumbnail"/>
          </transition>
        </div>
        <p class="mb0 c-darkgray">{{ product.name | htmlDecode }}</p>

        <span class="price-original mr5 lh30 c-gray-secondary" v-if="product.special_price">{{ product.originalPriceInclTax | price }}</span>
        <span class="price-special lh30 c-darkgray weight-700" v-if="product.special_price">{{ product.priceInclTax | price }}</span>
        <span class="lh30 c-gray-secondary" v-if="!product.special_price" >{{ product.priceInclTax | price }}</span>
      </router-link>
    </span>
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
  },
  data () {
    return {
      clicks: 0
    }
  },
  methods: {
    preventClicks (e) {
      this.clicks++
      if (this.clicks > 1) {
        e.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~src/themes/default/css/transitions';

.price-original {
  text-decoration: line-through;
}

.product-image > img {
  max-width: 242px;
  height: 100%;
  opacity: 0.8;
  transition: 0.3s all $motion-main;
  mix-blend-mode: multiply;
}
.product-image:hover > img {
  transform: scale(1.1);
  opacity: 1;
  transition: 0.3s all $motion-main;
}
.product-image {
  width: 100%;
  height: 300px;
  mix-blend-mode: multiply;
  overflow: hidden;
  background-color: #F2F2F2;
  transition: 0.3s all $motion-main;

  &:hover {
    background-color: #FBFBFB;
  }
}
</style>

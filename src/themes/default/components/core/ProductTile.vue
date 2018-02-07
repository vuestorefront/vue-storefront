<template>
  <div class="product align-center p15">
    <div @click.capture="preventClicks">
      <router-link
        class="no-underline"
        :to="{
          name: product.type_id + '-product',
          params: {
            parentSku: product.parentSku ? product.parentSku : product.sku,
            slug: product.slug,
            childSku: product.sku
          }
        }"
      >
        <div class="product-image bg-lightgray">
          <transition name="fade" appear>
            <img class="mw-100" v-if="instant" :src="thumbnail" :key="thumbnail" v-img-placeholder="placeholder">
            <img class="mw-100" v-if="!instant" v-lazy="thumbnailObj" :key="thumbnail">
          </transition>
        </div>
        <p class="mb0 c-darkgray">{{ product.name | htmlDecode }}</p>

        <span
          class="price-original mr5 lh30 c-gray-secondary"
          v-if="product.special_price"
        >
          {{ product.originalPriceInclTax | price }}
        </span>
        <span
          class="price-special lh30 c-darkgray weight-700"
          v-if="product.special_price"
        >
          {{ product.priceInclTax | price }}
        </span>
        <span class="lh30 c-gray-secondary" v-if="!product.special_price">
          {{ product.priceInclTax | price }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'
import imgPlaceholder from 'theme/components/theme/directives/imgPlaceholder'

export default {
  props: {
    instant: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  mixins: [coreComponent('core/ProductTile')],
  directives: { imgPlaceholder },
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
      clicks: 0,
      placeholder: '/assets/placeholder.jpg'
    }
  },
  computed: {
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder
      }
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
@import '~theme/css/global_vars';
$lightgray: map-get($colors, lightgray);

.product {
  @media (max-width: 700px) {
    padding: 0;
  }
}
.price-original {
  text-decoration: line-through;
}
.product-image {
  width: 100%;
  mix-blend-mode: multiply;
  overflow: hidden;
  transition: 0.3s all $motion-main;

  &:hover {
    background-color: rgba($lightgray, .3);

    > img {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  > img {
    max-height: 100%;
    width: auto;
    height: auto;
    opacity: 0.8;
    transition: 0.3s all $motion-main;
    mix-blend-mode: multiply;
  }
}
</style>

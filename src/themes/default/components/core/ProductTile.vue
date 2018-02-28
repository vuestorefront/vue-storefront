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
        <div
          class="product-image relative bg-cl-secondary"
          :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
        >
          <transition name="fade" appear>
            <img
              class="mw-100"
              v-if="instant"
              :src="thumbnail"
              :key="thumbnail"
              v-img-placeholder="placeholder"
              :alt="product.name"
            >
            <img
              class="mw-100"
              v-if="!instant"
              v-lazy="thumbnailObj"
              :key="thumbnail"
              :alt="product.name"
            >
          </transition>
        </div>
        <p class="mb0 cl-accent">{{ product.name | htmlDecode }}</p>
        <span
          class="price-original mr5 lh30 cl-secondary"
          v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0"
        >
          {{ product.originalPriceInclTax | price }}
        </span>
        <span
          class="price-special lh30 cl-accent weight-700"
          v-if="product.special_price && parseFloat(product.special_price) > 0"
        >
          {{ product.priceInclTax | price }}
        </span>
        <span class="lh30 cl-secondary" v-if="!product.special_price && parseFloat(product.priceInclTax) > 0">
          {{ product.priceInclTax | price }}
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'
import imgPlaceholder from 'theme/components/theme/directives/imgPlaceholder'

export default {
  props: {
    instant: {
      type: Boolean,
      required: false,
      default: () => false
    },
    labelsActive: {
      type: Boolean,
      requred: false,
      default: true
    }
  },
  mixins: [coreComponent('ProductTile')],
  directives: { imgPlaceholder },
  created () {
    this.$bus.$on('product-after-priceupdate', (product) => {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    })
    this.$bus.$on('product-after-configured', (config) => {
      this.$store.dispatch('product/configure', { product: this.product, configuration: config.configuration, selectDefaultVariant: false }).then((selectedVariant) => {
        if (selectedVariant) {
          this.product.parentSku = this.product.sku
          Object.assign(this.product, selectedVariant)
          this.$store.dispatch('product/doPlatformPricesSync', { products: [this.product] }, { root: true }).then((syncResult) => { // TODO: queue all these tasks to one
          })
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
    },
    isOnSale () {
      return this.product.sale === '1' ? 'sale' : ''
    },
    isNew () {
      return this.product.new === '1' ? 'new' : ''
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
@import '~theme/css/animations/transitions';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';

$bg-secondary: color(secondary, $colors-background);
$border-secondary: color(secondary, $colors-border);
$color-white: color(white);

.product {
  @media (max-width: 700px) {
    padding: 0;
  }
}

.price-original {
  text-decoration: line-through;
}

%label {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: $border-secondary;
  transition: 0.3s all $motion-main;
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
  font-weight: 400;
}

.product-image {
  width: 100%;
  mix-blend-mode: multiply;
  overflow: hidden;
  transition: 0.3s all $motion-main;

  &:hover {
    background-color: rgba($bg-secondary, .3);

    > img {
      transform: scale(1.1);
      opacity: 1;
    }

    &.sale::after,
    &.new::after {
      opacity: 0.8;
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

  &.sale {
    &::after {
      @extend %label;
      content: 'Sale';
    }
  }

  &.new {
    &::after {
      @extend %label;
      content: 'New';
    }
  }
}
</style>

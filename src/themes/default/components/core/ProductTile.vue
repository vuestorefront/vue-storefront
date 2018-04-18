<template>
  <div class="product align-center p15">
    <div>
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
              src="data:image/jpeg;base64,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"
              v-lazy="thumbnail"
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
    isOnSale () {
      return this.product.sale === '1' ? 'sale' : ''
    },
    isNew () {
      return this.product.new === '1' ? 'new' : ''
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

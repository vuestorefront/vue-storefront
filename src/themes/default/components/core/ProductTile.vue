<template>
  <div class="product align-center w-100" v-observe-visibility="visibilityChanged">
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
          <div>
            <transition name="fade" appear>
              <img
                class="mw-100 block"
                v-if="instant"
                :src="thumbnail"
                :key="thumbnail"
                v-img-placeholder="placeholder"
                :alt="product.name"
                height="300"
              >
              <img
                class="mw-100 block"
                v-if="!instant"
                :src="placeholder"
                v-lazy="thumbnail"
                :key="thumbnail"
                :alt="product.name"
                height="300"
              >
            </transition>
          </div>
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
import productTile from 'core/components/productTile'
import imgPlaceholder from 'theme/components/theme/directives/imgPlaceholder'
import config from 'config'
import rootStore from '@vue-storefront/store'
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
  mixins: [productTile],
  directives: { imgPlaceholder },
  methods: {
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (config.products.configurableChildrenStockPrefetchDynamic && config.products.filterUnavailableVariants) {
          const skus = []
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
            }
          }
        }
      }
    }
  },
  created () {
    this.$bus.$on('product-after-priceupdate', (product) => {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
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
}

.product-image {
  width: 100%;
  mix-blend-mode: multiply;
  overflow: hidden;
  transition: 0.3s all $motion-main;
  max-height: 300px;

  > div {
    padding-top: 118%;
  }

  &:hover {
    background-color: rgba($bg-secondary, .3);

    img {
      transform: scale(1.1);
      opacity: 1;
    }

    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }
  }

  img {
    max-height: 100%;
    height: auto;
    opacity: 0.8;
    transition: 0.3s all $motion-main;
    mix-blend-mode: multiply;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
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

<template>
  <div
    class="product w-100 pb20 t-cursor-pointer"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="product-cover t-relative t-bg-white t-mb-4"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image relative t-bg-white t-pb-10"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
        <amp-img
          :alt="product.name"
          :src="thumbnailObj.src"
          height="433"
          width="310"
        />
      </div>
    </router-link>

    <router-link :to="productLink" tag="div" class="t-text-sm t-pt-3" v-if="!onlyImage">
      <p class="t-mb-1 t-text-primary t-leading-tight" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <span
        class="price-original t-text-base-light t-line-through t-mr-2"
        v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
      >
        {{ product.original_price_incl_tax | price }}
      </span>

      <span
        class="price-special t-text-sale t-font-bold"
        v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
      >
        {{ product.price_incl_tax | price }}
      </span>

      <span
        class="price t-text-base-dark t-font-bold"
        v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
      >
        {{ product.price_incl_tax | price }}
      </span>
    </router-link>
  </div>
</template>

<script>
import rootStore from '@vue-storefront/core/store'
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import config from 'config'

export default {
  mixins: [ProductTile],
  props: {
    labelsActive: {
      type: Boolean,
      default: true
    },
    onlyImage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onProductPriceUpdate (product) {
      if (product.sku === this.product.sku) {
        Object.assign(this.product, product)
      }
    },
    visibilityChanged (isVisible, entry) {
      if (isVisible) {
        if (config.products.configurableChildrenStockPrefetchDynamic && config.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
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
  beforeMount () {
    this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
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
  @media (max-width: 767px) {
    padding-bottom: 10px;
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
  text-transform: uppercase;
  color: $color-white;
  font-size: 12px;
}

.product-image {
  width: 100%;
  overflow: hidden;
  max-height: 433px;

  amp-img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    /deep/ img {
        height: initial;
        width: initial;
        min-height: initial;
        min-width: initial;
    }
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

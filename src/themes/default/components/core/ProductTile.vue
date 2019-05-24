<template>
  <div
    class="product align-center w-100 pb20"
    v-observe-visibility="visibilityChanged"
  >
    <router-link
      class="block no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >
      <div
        class="product-image relative bg-cl-secondary"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }, {'product-image--loaded': imageLoaded}]">
        <img
          class="product-image__content"
          :alt="product.name"
          :src="thumbnailObj.src"
          height="300"
          width="310"
          data-testid="productImage"
          @load="imageLoaded = true"
        >
      </div>

      <p class="mb0 cl-accent mt10" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <span
        class="price-original mr5 lh30 cl-secondary"
        v-if="product.special_price && parseFloat(product.originalPriceInclTax) > 0 && !onlyImage"
      >
        {{ product.originalPriceInclTax | price }}
      </span>

      <span
        class="price-special lh30 cl-accent weight-700"
        v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
      >
        {{ product.priceInclTax | price }}
      </span>

      <span
        class="lh30 cl-secondary"
        v-if="!product.special_price && parseFloat(product.priceInclTax) > 0 && !onlyImage"
      >
        {{ product.priceInclTax | price }}
      </span>
    </router-link>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-6 py10"
           v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
        <base-input-number
          :name="$t('Quantity')"
          v-model="product.qty"
          :min="1"
          @blur="$v.$touch()"
          :validations="[
          {
            condition: $v.product.qty.$error && !$v.product.qty.minValue,
            text: $t('Quantity must be above 0')
          }
        ]"
        />
      </div>
      <div class="col-xs-12 col-sm-12 col-md-6 py10">
        <add-to-cart
          :product="product"
          :disabled="$v.product.qty.$error && !$v.product.qty.minValue"
          class="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {minValue} from 'vuelidate/lib/validators'
import AddToCart from 'theme/components/core/AddToCart.vue'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import rootStore from '@vue-storefront/core/store'
import {ProductTile} from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
import {isServer} from '@vue-storefront/core/helpers'
import config from 'config'

export default {
  components: {
    AddToCart,
    BaseInputNumber
  },
  mixins: [ProductTile],
  data () {
    return {
      imageLoaded: isServer
    }
  },
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
        if (config.products.configurableChildrenStockPrefetchDynamic && rootStore.products.filterUnavailableVariants) {
          const skus = [this.product.sku]
          if (this.product.type_id === 'configurable' && this.product.configurable_children && this.product.configurable_children.length > 0) {
            for (const confChild of this.product.configurable_children) {
              const cachedItem = rootStore.state.stock.cache[confChild.id]
              if (typeof cachedItem === 'undefined' || cachedItem === null) {
                skus.push(confChild.sku)
              }
            }
            if (skus.length > 0) {
              rootStore.dispatch('stock/list', {skus: skus}) // store it in the cache
            }
          }
        }
      }
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: {label: this.$t('OK')}
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: {label: this.$t('OK')}
      })
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
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

.addToCart {
  &.button-full {
    min-width: inherit;
  }
}

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
  max-height: 300px;
  height: 100%;
  min-height: 155px;
  display: flex;
  align-items: flex-end;
  background-image: url('/assets/placeholder.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% auto;

  @media (min-width: 768px) {
    min-height: 190px;
  }
  @media (min-width: 1200px) {
    min-height: 300px;
  }

  &__content {
    display: none;
  }

  &--loaded {
    background-image: none;

    .product-image__content {
      display: block;
      transform: translateZ(0);
    }
  }

  &:hover {
    img {
      opacity: 1;
      transform: scale(1.1);
    }

    &.sale::after,
    &.new::after {
      opacity: 0.8;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    mix-blend-mode: darken;
    opacity: 0.8;
    transform: scale(1);
    transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

    &[lazy="loaded"] {
      animation: products-loaded;
      animation-duration: 0.3s;
    }

    @keyframes products-loaded {
      from {
        opacity: 0;
      }
      to {
        opacity: 0.8;
      }
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

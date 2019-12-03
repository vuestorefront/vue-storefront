<template>
  <div>
    <div class="product-cover t-relative t-bg-white t-mb-4" v-observe-visibility="visibilityChanged">
      <router-link
        class="product-link t-block t-z-0"
        :to="productLink"
        data-testid="productLink"
      >
        <product-image-amp :image="thumbnailObj" :alt="product.name | htmlDecode" data-testid="productImageAmp" @load="imageLoading = false" />
      </router-link>
    </div>
    <router-link :to="productLink" tag="div" class="t-text-sm" v-if="!onlyImage">
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
import ProductImageAmp from './ProductImageAmp'

export default {
  mixins: [ProductTile],
  components: {
    ProductImageAmp
  },
  data () {
    return {
      imageLoading: true
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

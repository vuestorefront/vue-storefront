<template>
  <div class="product t-cursor-pointer" v-observe-visibility="visibilityChanged">
    <div class="product-cover t-relative t-bg-white" :class="{ 't-mb-4': !onlyImage }">
      <slot name="imageOverlay">
        <AddToWishlist class="t-absolute t-bottom-0 t-left-0 t-z-1" :is-overlay="true" :product="product" />
      </slot>
      <router-link :to="productLink" data-testid="productLink" class="product-link t-block t-z-0">
        <promo-banner :product="product" class="t-absolute t-top-0 t-right-0" />
        <placeholder ratio="161:233" v-if="imageLoading" />
        <product-image :image="thumbnailObj" :alt="product.name | htmlDecode" data-testid="productImage" @load="imageLoading = false" />
      </router-link>
    </div>
    <router-link :to="productLink" tag="div" class="t-text-sm" v-if="!onlyImage">
      <p class="t-text-primary t-leading-tight" :class="{ 't-mb-1': showPrice }">
        {{ translatedProductName | htmlDecode }}
      </p>
      <p v-if="showPrice">
        <span class="price-original t-text-base-light t-line-through t-mr-2" v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0">
          {{ price(product.original_price_incl_tax) }}
        </span>
        <span class="price-special t-text-sale t-font-bold" v-if="product.special_price && parseFloat(product.special_price) > 0">
          <span v-if="hasMultiplePrices" v-text="$t('as low as')" />
          {{ price(product.price_incl_tax) }}
        </span>
        <span class="price t-text-base-dark t-font-bold" v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0">
          <span v-if="hasMultiplePrices" v-text="$t('as low as')" />
          {{ price(product.price_incl_tax) }}
        </span>
      </p>
    </router-link>
  </div>
</template>

<script>
import config from 'config'
import Placeholder from 'theme/components/core/blocks/Placeholder'
import ProductImage from 'theme/components/core/ProductImage'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import PromoBanner from 'theme/components/core/blocks/Category/PromoBanner'
import ProductTileMixin from 'theme/mixins/product/tileMixin'
import ProductNameMixin from 'icmaa-catalog/mixins/ProductNameMixin'
import ProductPriceMixin from 'theme/mixins/product/priceMixin'
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { productThumbnailPath } from '@vue-storefront/core/helpers'

export default {
  name: 'ProductTile',
  mixins: [ProductTileMixin, IsOnWishlist, ProductNameMixin, ProductPriceMixin],
  components: {
    Placeholder,
    ProductImage,
    PromoBanner,
    AddToWishlist
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
    },
    showPrice: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    thumbnail () {
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    },
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  }
}
</script>

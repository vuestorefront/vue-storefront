<template>
  <li class="t-w-full t-flex t-mr-4 t-py-2">
    <div class="t-w-1/3 t-mr-4">
      <router-link :to="productLink">
        <product-image :image="image" />
      </router-link>
    </div>
    <div class="t-w-2/3 t-flex t-flex-col t-py-2 t-justify-between">
      <div class="t-mb-2">
        <router-link :to="productLink" class="t-block t-text-primary t-w-full t-text-sm t-leading-tight">
          {{ product.name | htmlDecode }}
        </router-link>
      </div>
      <div class="t-text-sm t-text-base-light t-pb-4 t-mb-2">
        <span class="price-original t-text-base-light t-line-through t-mr-2" v-if="product.special_price">{{ product.original_price_incl_tax | price }}</span>
        <span class="price-special t-text-sale t-font-bold" v-if="product.special_price">{{ product.price_incl_tax | price }}</span>
        <span class="price t-text-base-dark t-font-bold" v-if="!product.special_price">{{ product.price_incl_tax | price }}</span>
      </div>
      <div class="t-flex t-flex-grow t-items-end">
        <button-component type="primary" class="t-flex-grow" @click.native="redirect">
          {{ $t('Add to cart') }}
        </button-component>
        <add-to-wishlist :product="product" :icon-remove="'delete'" :button-type="'transparent'" class="t-flex-fix" @click.native.stop />
      </div>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import i18n from '@vue-storefront/i18n'
import ProductImage from 'theme/components/core/ProductImage'
import ButtonComponent from 'theme/components/core/blocks/Button'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'

export default {
  components: {
    AddToWishlist,
    ProductImage,
    ButtonComponent
  },
  mixins: [Product],
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  methods: {
    redirect () {
      this.$router.push(this.productLink)
    }
  }
}
</script>

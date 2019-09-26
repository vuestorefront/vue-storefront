<template>
  <li class="t-w-1/2 md:t-w-1/4 t-px-4 t-b-4">
    <div class="t-mb-4" @click="closeWishlist">
      <router-link :to="productLink">
        <product-image :image="image" />
      </router-link>
    </div>
    <h3 class="t-text-base t-text-sm t-leading-none" @click="closeWishlist">
      <router-link :to="productLink">
        {{ product.name | htmlDecode }}
      </router-link>
    </h3>
    <div class="t-mt-2 t-mb-4 t-text-sm t-text-base-light">
      <span class="price-original t-line-through t-mr-2" v-if="product.special_price">{{ product.original_price_incl_tax | price }}</span>
      <span class="price-special" v-if="product.special_price">{{ product.price_incl_tax | price }}</span>
      <span v-if="!product.special_price">{{ product.price_incl_tax | price }}</span>
    </div>
    <div>
      <remove-button @click="removeProductFromWhishList(product)" />
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
import RemoveButton from 'theme/components/core/blocks/Wishlist/RemoveButton'

export default {
  components: {
    RemoveButton,
    ProductImage
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
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.removeFromWishlist(product)
    }
  }
}
</script>

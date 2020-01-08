<template>
  <li class="row pr55 py20">
    <div class="blend bg-cl-secondary" @click="closeWishlist">
      <router-link :to="productLink">
        <product-image :image="image" />
      </router-link>
    </div>
    <div class="col-xs between-xs flex pl40 py15">
      <div @click="closeWishlist">
        <router-link :to="productLink">
          {{ product.name | htmlDecode }}
        </router-link>
        <div class="h6 cl-bg-tertiary pt5 sku">
          {{ product.sku }}
        </div>
        <div v-if="showAddToCart">
          <add-to-cart
            v-if="product.type_id === 'simple'"
            :product="product"
            class="wishlist-add-to-cart col-xs-12 col-sm-4 col-md-6"
          />
          <router-link
            v-else
            :to="productLink"
            class="wishlist-add-to-cart no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium col-xs-12 col-sm-4 col-md-6"
          >
            {{ $t('Configure') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="col-xs flex py15 align-right">
      <div>
        <span class="price-special" v-if="product.special_price">{{ product.price_incl_tax | price(storeView) }}</span>&nbsp;
        <span class="price-original" v-if="product.special_price">{{ product.original_price_incl_tax | price(storeView) }}</span>

        <span v-if="!product.special_price">
          {{ product.price_incl_tax | price(storeView) }}
        </span>
      </div>
      <div>
        <div class="mt5">
          <span @click="removeProductFromWhishList(product)"><remove-button class="cl-accent" /></span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import config from 'config'
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import ProductImage from 'theme/components/core/ProductImage'
import RemoveButton from './RemoveButton'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import AddToCart from 'theme/components/core/AddToCart'

export default {
  components: {
    RemoveButton,
    ProductImage,
    AddToCart
  },
  mixins: [Product],
  props: {
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
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

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
.blend {
  flex: 0 0 121px;
  opacity: .8;
  will-change: opacity;
  transition: .3s opacity $motion-main;
  &:hover{
     opacity: 1;
   }
}
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}
.wishlist-add-to-cart {
  padding: 10px;
  margin: 15px 0;
  min-width: 100px;
  font-size: 14px;
  text-align: center;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}
</style>

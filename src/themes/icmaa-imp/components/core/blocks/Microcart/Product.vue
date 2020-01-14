<template>
  <li class="t-flex t-py-2 t-border-b t-border-base-lightest">
    <div class="t-w-1/3 t-mr-4">
      <product-image :image="image" />
    </div>

    <div class="t-w-2/3 t-flex t-flex-col t-py-2">
      <div class="t-mb-4 t-leading-tight">
        <router-link class="t-text-primary t-text-sm" :to="productLink" data-testid="productLink" @click.native="$store.dispatch('ui/setMicrocart', false)">
          {{ productQty }} x {{ product.name | htmlDecode }}
        </router-link>
      </div>

      <div class="t-w-full t-text-sm t-mb-4" v-if="product.totals">
        <span class="t-text-base-light t-line-through t-mr-2" v-if="product.totals.discount_amount">
          {{ (product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount) | price }}
        </span>
        <span class="t-text-sale t-font-bold" v-if="product.totals.discount_amount">
          {{ product.totals.row_total_incl_tax | price }}
        </span>
        <span v-else class="t-font-bold">
          {{ ((product.regular_price || product.price_incl_tax) * product.qty) | price }}
        </span>
      </div>

      <div class="t-flex-grow">
        <div class="t-flex t-w-full t-flex-wrap t-items-center t-mb-4" v-if="totals.length > 0 || isFree">
          <button-component class="t-mr-2" type="tag" size="xs" :cursor-pointer="false" v-for="opt in totals" :key="opt.label">
            {{ opt.value }}
          </button-component>
          <div class="t-text-xs t-text-sale t-font-bold t-uppercase" v-if="isFree">
            {{ $t('Free') }}
          </div>
        </div>

        <div class="t-text-sm" v-if="hasProductErrors">
          {{ product.errors | formatProductMessages }}
        </div>
      </div>

      <div class="t-flex t-items-center t-flex-wrap t-justify-end t-text-base-light" v-if="!isFree">
        <button-component type="transparent" :size="'sm'" :icon="'remove_shopping_cart'" :icon-only="true" @click="removeItem" />
      </div>
    </div>
  </li>
</template>

<script>
import config from 'config'
import { mapGetters } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product'
import ButtonComponent from 'theme/components/core/blocks/Button'
import ProductImage from 'theme/components/core/ProductImage'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption'
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ButtonComponent,
    ProductImage
  },
  mixins: [Product, ProductOption],
  computed: {
    ...mapGetters({ freeCartItems: 'cart/getFreeCartItems' }),
    hasProductInfo () {
      return this.product.info && Object.keys(this.product.info).length > 0
    },
    hasProductErrors () {
      return this.product.errors && Object.keys(this.product.errors).length > 0
    },
    isTotalsActive () {
      return this.isOnline && !this.editMode && this.product.totals && this.product.totals.options
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    thumbnail () {
      return getThumbnailForProduct(this.product)
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    productQty () {
      return this.product.qty
    },
    totals () {
      if (this.isTotalsActive) {
        return this.product.totals.options
      } else if (this.product.options) {
        return this.product.options
      }
      return []
    },
    isFree () {
      return this.freeCartItems.includes(this.product.sku)
    }
  },
  methods: {
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    }
  }
}
</script>

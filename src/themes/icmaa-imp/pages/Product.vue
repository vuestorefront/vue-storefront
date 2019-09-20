<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <div class="t-container t-px-4">
      <div class="t--mx-4 lg:t-px-4 t-flex t-flex-wrap">
        <breadcrumbs class="breadcrumbs t-w-full t-my-8 t-hidden lg:t-block" :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
        <product-gallery
          class="product-gallery t-w-full t-py-px lg:t-w-1/2 lg:t-py-0"
          :offline="image"
          :gallery="gallery"
          :configuration="configuration"
          :product="product"
        />
        <div class="t-w-full t-p-8 t-bg-white lg:t-w-1/2">
          <div class="t-flex t-flex-wrap">
            <h1 data-testid="productName" itemprop="name" class="t-flex-grow t-w-1/2 t-mb-0 t-leading-snug">
              <template v-if="typeof productName === 'object'">
                <span class="t-block t-text-2xl t-font-thin t-leading-relaxed t-mb-2">{{ productName.mandant | htmlDecode }}</span>
                <span class="t-block t-text-lg t-font-bold">{{ productName.product | htmlDecode }}</span>
              </template>
              <template v-else>
                <span class="t-block t-text-2xl t-font-thin t-mb-2">{{ productName | htmlDecode }}</span>
              </template>
            </h1>
            <department-logo v-bind="departmentLogo.data()" v-if="departmentLogo" class="t-flex-fix t-self-start" />
            <reviews-short :rating="reviewsTotalRating" :count="reviewsCount" class="t-flex-fix t-w-full t-mt-4 lg:t-flex-expand lg:t-w-2/3" />
            <web-share :webshare-text="webshareText" :webshare-image="image.src" class="t-flex-fix t-w-full t-mt-4 t-text-base-light lg:t-w-auto" />

            <div class="t-w-full" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.price_incl_tax).toFixed(2)">
              <meta itemprop="availability" :content="structuredData.availability">
              <meta itemprop="url" :content="product.url_path">

              <div v-if="product.type_id !== 'grouped'" class="price t-mt-5 t-mb-8 t-text-1xl">
                <template v-if="product.special_price && product.price_incl_tax && product.original_price_incl_tax">
                  <span class="t-text-base-tone t-line-through">{{ product.original_price_incl_tax * product.qty | price }}</span>
                  &nbsp;
                  <span class="t-text-sale t-font-bold">{{ product.price_incl_tax * product.qty | price }}</span>
                </template>
                <span class="t-font-bold" v-if="!product.special_price && product.price_incl_tax">
                  {{ product.qty > 0 ? product.price_incl_tax * product.qty : product.price_incl_tax | price }}
                </span>
                <div class="t-mt-1 t-text-xs t-text-base-light" v-html="taxDisclaimer" />
              </div>

              <div class="t-flex t-flex-wrap">
                <div v-if="product.type_id === 'configurable' && !isOnesizeProduct && !loading" class="t-flex t-flex-grow t-w-full t-mb-4 lg:t-w-3/6 lg:t-mb-0 lg:t-mr-4">
                  <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                    {{ product.errors | formatProductMessages }}
                  </div>
                  <button-component type="select" icon="arrow_forward" class="t-w-full" :disabled="loading" @click.native="openAddtocart">
                    {{ productOptionsLabel }}
                  </button-component>
                </div>
                <button-component type="primary" class="t-flex-grow lg:t-w-2/6 disabled:t-opacity-75 t-relative" :disabled="loading" @click.native="addToCartButtonClick">
                  {{ $t('Add to cart') }}
                  <loader-background v-if="loading && isSingleOptionProduct" class="t-bottom-0" height="t-h-1" bar="t-bg-base-lightest t-opacity-25" />
                </button-component>
                <add-to-wishlist :product="product" class="t-flex-fix t-ml-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="container px15 pt50 pb35 cl-accent details">
      <h2 class="h3 m0 mb10 serif lh20 details-title">
        {{ $t('Product details') }}
      </h2>
      <div class="h4 details-wrapper">
        <div class="row between-md m0">
          <div class="col-xs-12 col-sm-6">
            <div class="lh30 h5" itemprop="description" v-html="product.description" />
          </div>
          <div class="col-xs-12 col-sm-5">
            <lazy-hydrate on-interaction>
              <ul class="attributes p0 pt5 m0">
                <product-attribute
                  :key="attr.attribute_code"
                  v-for="attr in customAttributes"
                  :product="product"
                  :attribute="attr"
                  empty-placeholder="N/A"
                />
              </ul>
            </lazy-hydrate>
          </div>
        </div>
      </div>
    </section>
    <lazy-hydrate when-idle>
      <reviews :product-id="originalProduct.id" v-show="OnlineOnly" />
    </lazy-hydrate>
    <lazy-hydrate when-idle>
      <related-products type="upsell" :heading="$t('We found other products you might like')" />
    </lazy-hydrate>
    <lazy-hydrate when-idle>
      <related-products type="related" />
    </lazy-hydrate>
    <async-sidebar
      :async-component="AddToCartSidebar"
      :is-open="isAddToCartSidebarOpen"
      @close="$store.commit('ui/setAddtocart')"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { minValue } from 'vuelidate/lib/validators'
import i18n from '@vue-storefront/i18n'
import Product from '@vue-storefront/core/pages/Product'
import IcmaaProduct from 'icmaa-catalog/components/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from 'theme/components/theme/WebShare'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import LazyHydrate from 'vue-lazy-hydration'
import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar.vue'
import { ReviewModule } from '@vue-storefront/core/modules/review'
import { IcmaaExtendedReviewModule } from 'icmaa-review'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import { registerModule, isModuleRegistered } from '@vue-storefront/core/lib/modules'
import ProductOptionsMixin from 'theme/mixins/product/optionsMixin'
import ProductAddToCartMixin from 'theme/mixins/product/addtocartMixin'

import ButtonComponent from 'theme/components/core/blocks/Button.vue'
import DepartmentLogo from 'theme/components/core/blocks/ICMAA/CategoryExtras/DepartmentLogo.vue'
import ReviewsShort from 'theme/components/core/blocks/Reviews/ReviewsShort'
import LoaderBackground from 'theme/components/core/LoaderBackground'

const AddToCartSidebar = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-addtocart-sidebar" */ 'theme/components/core/blocks/AddToCartSidebar/AddToCartSidebar.vue')

export default {
  components: {
    AsyncSidebar,
    AddToWishlist,
    Breadcrumbs,
    ButtonComponent,
    LoaderBackground,
    DepartmentLogo,
    ProductAttribute,
    ProductGallery,
    RelatedProducts,
    Reviews,
    ReviewsShort,
    WebShare,
    LazyHydrate
  },
  mixins: [Product, IcmaaProduct, ProductOptionsMixin, ProductAddToCartMixin, VueOfflineMixin],
  directives: { focusClean },
  beforeCreate () {
    registerModule(ReviewModule)
    registerModule(IcmaaExtendedReviewModule)
    registerModule(RecentlyViewedModule)
  },
  data () {
    return {
      AddToCartSidebar,
      quantity: 0
    }
  },
  created () {
    this.getQuantity()
  },
  computed: {
    ...mapState({ isAddToCartSidebarOpen: state => state.ui.addtocart }),
    structuredData () {
      return {
        availability: this.product.stock.is_in_stock ? 'InStock' : 'OutOfStock'
      }
    },
    isSingleOptionProduct () {
      return this.product.type_id === 'simple' || this.isOnesizeProduct
    },
    isOnesizeProduct () {
      if (this.productOptions.length === 1 && this.productOptions[0].attribute_code === 'size') {
        return Object.values(this.productOptions[0].values)
          .find(o => this.getOptionLabel({ attributeKey: 'size', optionId: o.value_index }) === 'Onesize') !== undefined
      }

      return false
    },
    taxDisclaimer () {
      return i18n.t(
        '{incl} {rate}% VAT, Excl. shipping',
        { rate: 19, incl: i18n.t('incl.') }
      )
    }
  },
  methods: {
    ...mapActions({
      openAddtocart: 'ui/toggleAddtocart'
    }),
    addToCartButtonClick () {
      if (!this.loading) {
        if (this.isSingleOptionProduct) {
          this.loading = true
          this.getQuantity()
            .then(() => this.addToCart(this.product))
            .then(() => { this.loading = false })
            .catch(() => { this.loading = false })

          return
        }

        this.openAddtocart()
      }
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(
          'The product is out of stock and cannot be added to the cart!'
        ),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t(
          'No such configuration for the product. Please do choose another combination of attributes.'
        ),
        action1: { label: this.$t('OK') }
      })
    }
  }
}
</script>

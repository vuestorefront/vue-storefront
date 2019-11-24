<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <div class="t-container t-px-4">
      <div class="t--mx-4 lg:t-px-4 t-flex t-flex-wrap">
        <breadcrumbs class="breadcrumbs t-w-full t-my-8 t-hidden lg:t-flex" :routes="breadcrumbs" :active-route="product.name" />
        <category-extras-header class="t-bg-white t-border-b t-border-base-lightest" v-if="['xs', 'sm', 'md'].includes(viewport)" :spotify-logo-limit="spotifyLogoLimit" />
        <product-gallery
          class="product-gallery t-w-full t-border-base-lightest t-border-b t-bg-white lg:t-w-1/2 lg:t-border-b-0"
          :offline="offlineImage"
          :gallery="gallery"
          :configuration="configuration"
          :product="product"
        />
        <div class="t-w-full t-p-8 t-bg-white lg:t-w-1/2">
          <category-extras-header class="t--mx-8 t--mt-8 t-mb-8 lg:t-pl-px t-border-b t-border-base-lightest" v-if="!['xs', 'sm', 'md'].includes(viewport)" :spotify-logo-limit="spotifyLogoLimit" />
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
              <meta itemprop="priceCurrency" :content="$store.state.storeView.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.price_incl_tax).toFixed(2)">
              <meta itemprop="availability" :content="structuredData.availability">
              <meta itemprop="url" :content="product.url_path">

              <div v-if="product.type_id !== 'grouped'" class="price t-mt-5 t-mb-8 t-text-1xl">
                <template v-if="product.special_price && product.price_incl_tax && product.original_price_incl_tax">
                  <span class="t-text-base-tone t-line-through">{{ product.original_price_incl_tax * product.qty | price }}</span>
                  &nbsp;
                  <span class="t-text-sale t-font-bold">
                    <span v-if="hasMultiplePrices" v-text="$t('as low as')" class="t-text-sm" />
                    {{ product.price_incl_tax * product.qty | price }}
                  </span>
                </template>
                <span class="t-font-bold" v-if="!product.special_price && product.price_incl_tax">
                  <span v-if="hasMultiplePrices" v-text="$t('as low as')" class="t-text-sm" />
                  {{ product.qty > 0 ? product.price_incl_tax * product.qty : product.price_incl_tax | price }}
                </span>
                <div class="t-mt-1 t-text-xs t-text-base-light" v-html="taxDisclaimer" />
              </div>

              <div class="t-flex t-flex-wrap">
                <div v-if="product.type_id === 'configurable' && !isOnesizeProduct && !loading" class="t-flex t-flex-grow t-w-full t-mb-4 lg:t-w-3/6 lg:t-mb-0 lg:t-mr-4">
                  <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                    {{ product.errors | formatProductMessages }}
                  </div>
                  <button-component type="select" icon="arrow_forward" class="t-w-full" :disabled="isAddToCartDisabled" @click.native="openAddtocart">
                    {{ productOptionsLabel }}
                  </button-component>
                </div>
                <button-component type="primary" class="t-flex-grow lg:t-w-2/6 disabled:t-opacity-75 t-relative" :disabled="isAddToCartDisabled" @click.native="addToCartButtonClick">
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

    <div class="t-container t-px-4 t-mt-8">
      <div class="t--mx-4 lg:t-px-4 t-flex t-flex-wrap">
        <div class="product-details t-w-full t-p-8 t-bg-white lg:t-w-1/2">
          <lazy-hydrate on-interaction>
            <details-tabs :tabs="detailsTabs">
              <template #pill-details>
                {{ $t('Product details') }}
              </template>
              <template #tab-details>
                <product-details :product="product" />
              </template>
              <template #pill-features>
                {{ $t('Features') }}
              </template>
              <template #tab-features>
                <product-features :product="product" />
              </template>
              <template #pill-care-instructions>
                {{ $t('Care instructions') }}
              </template>
              <template #tab-care-instructions>
                <product-care-instructions :product="product" />
              </template>
            </details-tabs>
          </lazy-hydrate>
        </div>
        <div class="reviews t-relative t-w-full t-p-8 t-bg-base-lighter lg:t-w-1/2" id="reviews">
          <lazy-hydrate when-idle>
            <reviews :product="originalProduct" :product-name="translatedProductName" v-show="isOnline" />
          </lazy-hydrate>
          <lazy-hydrate when-idle>
            <reviews-claim />
          </lazy-hydrate>
        </div>
      </div>
    </div>

    <div class="spacer t-h-8" />

    <async-sidebar
      :async-component="AddToCartSidebar"
      :is-open="isAddToCartSidebarOpen"
      @close="$store.dispatch('ui/setAddtocart')"
    />
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'
import config from 'config'

import { minValue } from 'vuelidate/lib/validators'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { onlineHelper, isServer } from '@vue-storefront/core/helpers'
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import focusClean from 'theme/components/theme/directives/focusClean'

import { ReviewModule } from '@vue-storefront/core/modules/review'
import { IcmaaExtendedReviewModule } from 'icmaa-review'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews'

import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar'
import IcmaaProduct from 'icmaa-catalog/components/Product'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import ProductGallery from 'theme/components/core/ProductGallery'
import WebShare from 'theme/components/theme/WebShare'
import ButtonComponent from 'theme/components/core/blocks/Button'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import CategoryExtrasHeader from 'theme/components/core/blocks/CategoryExtras/Header'
import DepartmentLogo from 'theme/components/core/blocks/CategoryExtras/DepartmentLogo'
import DetailsTabs from 'theme/components/core/blocks/Product/Tabs'
import ProductDetails from 'theme/components/core/blocks/Product/ProductDetails'
import ProductFeatures from 'theme/components/core/blocks/Product/ProductFeatures'
import ProductCareInstructions from 'theme/components/core/blocks/Product/ProductCareInstructions'
import ReviewsShort from 'theme/components/core/blocks/Reviews/ReviewsShort'
import ReviewsClaim from 'theme/components/core/blocks/Reviews/ReviewsClaim'
import LoaderBackground from 'theme/components/core/LoaderBackground'
import LazyHydrate from 'vue-lazy-hydration'

import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption'
import VueOfflineMixin from 'vue-offline/mixin'
import ProductMetaMixin from 'icmaa-meta/mixins/productMeta'
import ProductPriceMixin from 'theme/mixins/product/priceMixin'
import ProductOptionsMixin from 'theme/mixins/product/optionsMixin'
import ProductAddToCartMixin from 'theme/mixins/product/addtocartMixin'
import FeaturesMixin from 'theme/mixins/product/featuresMixin'

const AddToCartSidebar = () => import(/* webpackPreload: true */ /* webpackChunkName: "vsf-addtocart-sidebar" */ 'theme/components/core/blocks/AddToCartSidebar/AddToCartSidebar')

export default {
  components: {
    AsyncSidebar,
    AddToWishlist,
    Breadcrumbs,
    DepartmentLogo,
    CategoryExtrasHeader,
    ButtonComponent,
    LoaderBackground,
    ProductGallery,
    DetailsTabs,
    ProductDetails,
    ProductFeatures,
    ProductCareInstructions,
    Reviews,
    ReviewsShort,
    ReviewsClaim,
    WebShare,
    LazyHydrate
  },
  mixins: [ProductOption, IcmaaProduct, ProductMetaMixin, ProductPriceMixin, ProductOptionsMixin, ProductAddToCartMixin, FeaturesMixin],
  directives: { focusClean },
  beforeCreate () {
    registerModule(ReviewModule)
    registerModule(IcmaaExtendedReviewModule)
    registerModule(RecentlyViewedModule)
  },
  data () {
    return {
      AddToCartSidebar,
      quantity: 0,
      loading: false
    }
  },
  created () {
    this.getQuantity()
  },
  computed: {
    ...mapGetters({
      category: 'category-next/getCurrentCategory',
      breadcrumbs: 'product/getProductBreadcrumbs',
      product: 'product/getCurrentProduct',
      gallery: 'product/getProductGallery',
      configuration: 'product/getCurrentProductConfiguration',
      originalProduct: 'product/getOriginalProduct',
      viewport: 'ui/getViewport'
    }),
    ...mapState({ isAddToCartSidebarOpen: state => state.ui.addtocart }),
    image () {
      return this.gallery.length ? this.gallery[0] : false
    },
    offlineImage () {
      return {
        src: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height),
        error: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height),
        loading: this.getThumbnail(this.product.image, config.products.thumbnails.width, config.products.thumbnails.height)
      }
    },
    structuredData () {
      return {
        availability: this.product.stock.is_in_stock ? 'InStock' : 'OutOfStock'
      }
    },
    isAddToCartDisabled () {
      return this.$v.$invalid || this.loading || !this.quantity
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
    detailsTabs () {
      let tabs = ['details']

      if (this.hasFeatures) {
        tabs.push('features')
      }

      if (this.product.features_care && this.product.features_care.join('') !== '') {
        tabs.push('care-instructions')
      }

      return tabs
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    taxDisclaimer () {
      return i18n.t(
        '{incl} {rate}% VAT, Excl. shipping',
        { rate: 19, incl: i18n.t('incl.') }
      )
    },
    spotifyLogoLimit () {
      return this.viewport === 'sm' ? 4 : 5
    }
  },
  methods: {
    ...mapActions({
      openAddtocart: 'ui/setAddtocart'
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
  },
  watch: {
    isOnline: {
      handler (isOnline) {
        if (isOnline) {
          this.getQuantity()
        }
      },
      immediate: true
    }
  },
  async asyncData ({ store, route }) {
    const product = await store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
    const loadBreadcrumbsPromise = store.dispatch('product/loadProductBreadcrumbs', { product })
    if (isServer) {
      await loadBreadcrumbsPromise
    }
    catalogHooksExecutors.productPageVisited(product)
  }
}
</script>

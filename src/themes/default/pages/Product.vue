<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class="bg-cl-secondary px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-6 center-xs middle-xs image">
            <product-gallery
              :gallery="gallery"
              :configuration="configuration"
              :product="product"
            />
          </div>
          <div class="col-xs-12 col-md-5 data">
            <breadcrumbs
              class="pt40 pb20 hidden-xs"
              :routes="breadcrumbs.routes"
              :active-route="breadcrumbs.name"
            />
            <h1 class="mb20 mt0 cl-mine-shaft product-name" data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
              <web-share :title="product.name | htmlDecode" text="Check this product!" class="web-share"/>
            </h1>
            <div class="mb20 uppercase cl-secondary">
              sku: {{ product.sku }}
            </div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="currentStore.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(product.priceInclTax).toFixed(2)">
              <div
                class="mb40 price serif"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="h3 cl-secondary"
                  v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
                >
                  <span class="h2 cl-mine-shaft weight-700">
                    {{ product.priceInclTax * product.qty | price }}
                  </span>&nbsp;
                  <span class="price-original h3">
                    {{ product.originalPriceInclTax * product.qty | price }}
                  </span>
                </div>
                <div
                  class="h2 cl-mine-shaft weight-700"
                  v-if="!product.special_price && product.priceInclTax"
                >
                  {{ product.qty > 0 ? product.priceInclTax * product.qty : product.priceInclTax | price }}
                </div>
              </div>
              <div
                class="cl-primary variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
                </div>
                <div
                  class="h5"
                  v-for="(option, index) in product.configurable_options"
                  v-if="(!product.errors || Object.keys(product.errors).length === 0) && Object.keys(configuration).length > 0"
                  :key="index"
                >
                  <div class="variants-label" data-testid="variantsLabel">
                    {{ option.label }}
                    <span class="weight-700">
                      {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }}
                    </span>
                  </div>
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.label == 'Color'">
                      <color-selector
                        v-for="(c, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(c)"
                        :key="i"
                        :id="c.id"
                        :label="c.label"
                        context="product"
                        :code="option.attribute_code"
                        :class="{ active: c.id == configuration[option.attribute_code].id }"
                      />
                    </div>
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <size-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        v-for="(s, i) in options[option.attribute_code]"
                        v-if="isOptionAvailable(s)"
                        :key="i"
                        :id="s.id"
                        :label="s.label"
                        context="product"
                        :code="option.attribute_code"
                        class="mr10 mb10"
                        :class="{ active: s.id == configuration[option.attribute_code].id }"
                        v-focus-clean
                      />
                    </div>
                    <router-link
                      to="/size-guide"
                      v-if="option.label == 'Size'"
                      class="
                        p0 ml30 inline-flex middle-xs no-underline h5
                        action size-guide pointer cl-secondary
                      "
                    >
                      <i class="pr5 material-icons">accessibility</i>
                      <span>
                        {{ $t('Size guide') }}
                      </span>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <product-bundle-options
              v-if="product.bundle_options && product.bundle_options.length > 0 && !loading"
              :product="product"
            />
            <product-custom-options
              v-else-if="product.custom_options && product.custom_options.length > 0 && !loading"
              :product="product"
            />
            <div class="row m0 mb35" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
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
            <div class="row m0">
              <add-to-cart
                :product="product"
                :disabled="$v.product.qty.$error && !$v.product.qty.minValue"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>
            <div class="row py40 add-to-buttons">
              <div class="col-xs-6 col-sm-3 col-md-6">
                <wishlist-button :product="product" />
              </div>
              <div class="col-xs-6 col-sm-3 col-md-6 product__add-to-compare">
                <button
                  @click="isOnCompare ? removeFromList('compare') : addToList('compare')"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action h5 pointer cl-secondary
                  "
                  type="button"
                  data-testid="addToCompare"
                >
                  <i class="pr5 material-icons">compare</i>
                  <template v-if="!isOnCompare">
                    {{ $t('Add to compare') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove from compare') }}
                  </template>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="container px15 pt50 pb35 cl-accent details">
      <h2 class="h3 m0 mb10 serif lh20 details-title">
        {{ $t('Product details') }}
      </h2>
      <div
        class="h4 details-wrapper"
        :class="{'details-wrapper--open': detailsOpen}"
      >
        <div class="row between-md m0">
          <div class="col-xs-12 col-sm-6">
            <div
              class="lh30 h5"
              itemprop="description"
              v-html="product.description"
            />
          </div>
          <div class="col-xs-12 col-sm-5">
            <ul class="attributes p0 pt5 m0">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in customAttributes"
                :product="product"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </div>
          <div
            class="details-overlay"
            @click="showDetails"
          />
        </div>
      </div>
    </section>
    <reviews v-show="OnlineOnly"/>
    <related-products
      type="upsell"
      :heading="$t('We found other products you might like')"
    />
    <promoted-offers single-banner />
    <related-products type="related" />
  </div>
</template>

<script>
import { minValue } from 'vuelidate/lib/validators'
import Product from '@vue-storefront/core/pages/Product'
import VueOfflineMixin from 'vue-offline/mixin'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductTile from 'theme/components/core/ProductTile.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from '@vue-storefront/core/modules/social-share/components/WebShare'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'

export default {
  components: {
    'WishlistButton': () => import(/* webpackChunkName: "wishlist" */'theme/components/core/blocks/Wishlist/AddToWishlist'),
    AddToCart,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    ProductTile,
    PromotedOffers,
    RelatedProducts,
    Reviews,
    SizeSelector,
    WebShare,
    BaseInputNumber
  },
  mixins: [Product, VueOfflineMixin],
  data () {
    return {
      detailsOpen: false
    }
  },
  directives: { focusClean },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t('The product is out of stock and cannot be added to the cart!'),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('No such configuration for the product. Please do choose another combination of attributes.'),
        action1: { label: this.$t('OK') }
      })
    }
  },
  validations: {
    product: {
      qty: {
        minValue: minValue(1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);

.product {
  &__add-to-compare {
    display: none;
    @media (min-width: 767px) {
      display: block;
    }
  }
}

.breadcrumbs {
  @media (max-width: 767px) {
    margin: 15px 0;
    padding: 15px 0 0 15px;
  }
}

.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
}

.product-name {
  @media (max-width: 767px) {
    font-size: 36px;
  }
}

.price {
  @media (max-width: 767px) {
    color: $color-primary;
  }
}

.variants-label {
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

 .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
  }
}

.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details {
  @media (max-width: 767px) {
    padding: 50px 15px 15px;
  }
}

.details-title {
  padding: 0 8px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.price-original {
  text-decoration: line-through;
}

.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.web-share {
  float: right;
}
</style>

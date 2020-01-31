<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class="bg-cl-secondary px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12 col-md-6 center-xs middle-xs image">
            <amp-carousel
              class="product-gallery"
              width="450"
              height="500"
              layout="responsive"
              type="slides"
            >
              <amp-img
                class="product-image"
                layout="responsive"
                v-for="image in gallery"
                :key="image.src"
                :src="image.src"
                :width="450"
                :height="500"
              />
            </amp-carousel>
          </div>
          <div class="col-xs-12 col-md-5 data">
            <breadcrumbs
              class="pt40 pb20 hidden-xs"
            />
            <h1 class="mb20 mt0 cl-mine-shaft product-name" data-testid="productName" itemprop="name">
              {{ product.name | htmlDecode }}
            </h1>
            <div class="mb20 uppercase cl-secondary">
              sku: {{ product.sku }}
            </div>
            <div itemprop="offers" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="priceCurrency">
              <meta itemprop="price" :content="parseFloat(product.price_incl_tax).toFixed(2)">
              <div
                class="mb40 price serif"
                v-if="product.type_id !== 'grouped'"
              >
                <div
                  class="h3 cl-secondary"
                  v-if="product.special_price && product.price_incl_tax && product.original_price_incl_tax"
                >
                  <span class="h2 cl-mine-shaft weight-700">
                    {{ product.price_incl_tax * product.qty | price(storeView) }}
                  </span>&nbsp;
                  <span class="price-original h3">
                    {{ product.original_price_incl_tax * product.qty | price(storeView) }}
                  </span>
                </div>
                <div
                  class="h2 cl-mine-shaft weight-700"
                  v-if="!product.special_price && product.price_incl_tax"
                >
                  {{ product.price_incl_tax * product.qty | price(storeView) }}
                </div>
              </div>
              <div
                class="cl-primary variants"
                v-if="product.type_id =='configurable' && !loading"
              >
                <div class="error" v-if="product.errors && Object.keys(product.errors).length > 0">
                  {{ product.errors | formatProductMessages }}
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
            <div class="row m0">
              <router-link class="button-full text-center block w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium col-xs-12 col-sm-4 col-md-6" :to="localizedRoute({
                name: product.type_id + '-product',
                params: {
                  parentSku: product.parentSku ? product.parentSku : product.sku,
                  slug: product.slug,
                  childSku: product.sku
                }
              })"
              >
                Check available sizes
              </router-link>
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
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import focusClean from 'theme/components/theme/directives/focusClean'
import { isServer } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  components: {
    Breadcrumbs,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductLinks
  },
  data () {
    return {
      detailsOpen: false
    }
  },
  computed: {
    ...mapGetters({
      breadcrumbs: 'product/getProductBreadcrumbs',
      product: 'product/getCurrentProduct',
      gallery: 'product/getProductGallery'
    }),
    storeView () {
      return currentStoreView()
    },
    priceCurrency: () => currentStoreView().i18n.currencyCode
  },
  directives: { focusClean },
  methods: {
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    }
  },
  async asyncData ({ store, route, context }) {
    context.output.template = 'amp'
    context.output.appendHead = (context) => {
      return '<script async src="https://cdn.ampproject.org/v0.js"><' + '/script>' +
      '<script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.1.js"><' + '/script>'
    }
    const product = await store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
    const loadBreadcrumbsPromise = store.dispatch('product/loadProductBreadcrumbs', { product })
    if (isServer) await loadBreadcrumbsPromise
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
$color-mine-shaft: color(mine-shaft);
$color-suva-gray: color(suva-gray);

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

.qty-input {
  border-style: solid;
  border-width: 0 0 1px 0;
  width: 90px;
}

.qty-label {
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 14px;
}

.button-full {
  min-width: 250px;
}

.text-center {
  text-align: center;
}

.product-gallery .product-image {
  opacity: 0.9;
  mix-blend-mode: multiply;
  vertical-align: top;
}

</style>

<style lang="scss">

@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-suva-gray: color(suva-gray);

.amp-carousel-button-prev, .amp-carousel-button-next {
  background: none;
  outline: 0;
  display: none;
  cursor: pointer;
  &:before {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    height: 100%;
    line-height: 34px;
    -webkit-font-smoothing: antialiased;
    color: $color-suva-gray;
  }
}

.product-gallery {
  &:hover {
      .amp-carousel-button-prev, .amp-carousel-button-next {
        display: initial;
      }
  }
}

.amp-carousel-button-prev {
  &:before {
    content: 'keyboard_arrow_left';
  }
}

.amp-carousel-button-next {
  &:before {
    content: 'keyboard_arrow_right';
  }
}

</style>

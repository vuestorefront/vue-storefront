<template>
  <div id="product">
    <section class="bg-cl-secondary px20 product-top-section">
      <div class="container">
        <section class="row m0 data-wrapper">
          <div class="col-xs-12 col-md-6 px15 center-xs middle-xs image">
            <product-gallery :gallery="gallery" />
          </div>
          <div class="col-md-6 col-xs-12 px20 data">
            <breadcrumbs class="py30" :routes="breadcrumbs.routes" :active-route="breadcrumbs.name"/>
            <div class="uppercase cl-secondary">
              sku: {{ product.sku }}
            </div>
            <h1 class="mb20 mt0 cl-accent product-name">
              {{ product.name | htmlDecode }}
            </h1>
            <div class="mb30 price" v-if="product.type_id !== 'grouped'">
              <div
                class="h3 cl-secondary"
                v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax"
              >
                <span class="cl-error">
                  {{ product.priceInclTax | price }}
                </span>&nbsp;
                <span class="price-original h4">
                  {{ product.originalPriceInclTax | price }}
                </span>
              </div>
              <div
                class="h3 cl-bg-tertiary"
                v-if="!product.special_price && product.priceInclTax"
              >
                {{ product.priceInclTax | price }}
              </div>
            </div>
            <div
              class="cl-primary variants"
              v-if="product.type_id =='configurable' && !loading"
            >
              <div
                class="h4"
                v-for="(option, index) in product.configurable_options"
                :key="index"
              >
                <div class="variants-label">
                  {{ option.label }}
                  <span class="weight-700">
                    {{ configuration[option.attribute_code ? option.attribute_code : option.label.toLowerCase()].label }}
                  </span>
                </div>
                <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                  <div v-if="option.label == 'Color'">
                    <color-selector
                      v-for="(c, i) in options.color"
                      :key="i"
                      :id="c.id"
                      :label="c.label"
                      context="product"
                      code="color"
                      :class="{ active: c.id == configuration.color.id }"
                    />
                  </div>
                  <div class="sizes" v-else-if="option.label == 'Size'">
                    <size-selector
                      v-for="(s, i) in options.size"
                      :key="i"
                      :id="s.id"
                      :label="s.label"
                      context="product"
                      code="size"
                      class="mr10 mb10"
                      :class="{ active: s.id == configuration.size.id }"
                      v-focus-clean
                    />
                  </div>
                  <div :class="option.attribute_code" v-else>
                    <generic-selector
                      v-for="(s, i) in options[option.attribute_code]"
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
                      p0 ml30 inline-flex middle-xs weight-700 uppercase
                      no-underline action size-guide pointer cl-tertiary
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
            <product-links
              v-if="product.type_id =='grouped' && !loading"
              :products="product.product_links"
            />
            <div class="row m0">
              <add-to-cart
                :product="product"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>
            <div class="row pt45 add-to-buttons">
              <div class="col-xs-12 col-sm-5">
                <button
                  @click="addToFavorite"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action weight-700 h5 uppercase pointer cl-tertiary
                  "
                  type="button"
                >
                  <i class="pr5 material-icons">{{ favorite.icon }}</i>
                  <template v-if="!favorite.isFavorite">
                    {{ $t('Add to favorite') }}
                  </template>
                  <template v-else>
                    {{ $t('Remove') }}
                  </template>
                </button>
              </div>
              <div class="hidden-xs col-md-7">
                <button
                  @click="addToCompare"
                  class="
                    p0 inline-flex middle-xs bg-cl-transparent brdr-none
                    action weight-700 h5 uppercase pointer cl-tertiary
                  "
                  type="button"
                >
                  <i class="pr5 material-icons">compare</i>
                  <template v-if="!compare.isCompare">
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
    <section class="container pt50 pb20 px20 cl-accent details">
      <h2 class="h3 m0 mb10 sans-serif">
        {{ $t('Product details') }}
      </h2>
      <div class="h4 details-wrapper" ref="details">
        <div class="row between-md m0">
          <div class="col-md-5">
            <div
              class="lh30 cl-secondary"
              v-html="product.description"
            />
          </div>
          <div class="col-md-6">
            <ul class="attributes p0 pt10 m0">
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
    <related-products/>
  </div>
</template>

<script>
import { corePage } from 'core/lib/themes'

import RelatedProducts from '../components/core/blocks/Product/Related.vue'
import AddToCart from '../components/core/AddToCart.vue'
import GenericSelector from 'core/components/GenericSelector.vue'
import ColorSelector from '../components/core/ColorSelector.vue'
import SizeSelector from '../components/core/SizeSelector.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'
import ProductTile from '../components/core/ProductTile.vue'
import ProductLinks from '../components/core/ProductLinks.vue'
import focusClean from 'theme/components/theme/directives/focusClean'
import ProductGallery from '../components/core/ProductGallery'

export default {
  asyncData ({ store, route }) {
    // this is for SSR purposes to prefetch data
  },
  directives: { focusClean },
  methods: {
    showDetails (event) {
      const details = this.$refs.details
      details.style.maxHeight = `${details.children[0].offsetHeight}px`
      event.target.classList.add('hidden')
    }
  },
  components: {
    ProductGallery,
    AddToCart,
    GenericSelector,
    ColorSelector,
    SizeSelector,
    Breadcrumbs,
    ProductAttribute,
    ProductTile,
    RelatedProducts,
    ProductLinks
  },
  mixins: [corePage('Product')]
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

.data-wrapper {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
    padding: 20px 0 30px 0;
  }
}

.product-name {
  @media (max-width: 767px) {
    margin-top: 10px;
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
      width: 60%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 40%;
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

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
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
    color: $color-secondary;
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
</style>

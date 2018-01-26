<template>
  <div id="product">
      <div class="container">
          <div class="row my30">
            <div class="col-md-12">
              <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
            </div>
          </div>
          <div class="row">
              <div class="animate col-md-7 pr20">
                <img class="full-width b" v-lazy="imgObj" ref="image"/>
              </div>
              <div class="animate col-md-5">
                  <div class="row">
                      <div class="col-md-12">
                          <h1 class="mt0">
                            {{ product.name }}
                          </h1>
                      </div>
                  </div>
                  <div class="row mb10">
                      <div class="fs-large col-md-12">
                          {{ product.price | price }}
                      </div>
                  </div>
                  <div class="row" v-if="product.type_id =='configurable'" v-for="(variant, index) in product.configurable_options" :key="index">
                      <div class="col-md-12 uppercase c-secondary">
                        <h4>{{ variant.label }}</h4>
                      </div>
                      <div class="col-md-12">
                          <color-filter v-for="(color, i) in options.color" :key="i" :color="color.label" :id="color.id" class="mr5" :active="color.id == configuration.color.id" v-if="variant.label == 'Color'" />
                          <size-filter v-for="(size, i) in options.size" :key="i"  :size="size.label"  :id="size.id" class="mr15" :active="size.id == configuration.size.id" v-if="variant.label == 'Size'" />
                      </div>
                  </div>
                    <div class="row mt30">
                      <div class="col-md-12">
                          <button 
                            class="availibility-btn c-on-accent fs-large b-none py20 medium"
                            :class="{ 'bg-accent bg-accent-hover' : !availability.checked, 
                                      'bg-btn-positive' : availability.checked || availability.available, 
                                      'bg-btn-positive' : availability.checked || !availability.available }"
                            @click="isAvailable()"> {{ availabilityLabel }}</button>
                      </div>
                  </div>
                  <div v-if="!ui.savedToWishlist" class="row mt40">
                    <div class="col-md-4">
                      <div @click="addToWishlist" class="c-secondary-lighter c-icon-hover pointer flex start-xs middle-xs uppercase fs-medium-small hover-transition">
                        <span class="material-icons">favorite_border</span>
                        <span class="pl10">Save product</span>
                        </div>
                    </div>
                  </div>
                  <div class="row mt40 fs-medium-small">
                    <div class="col-md-12 uppercase bold c-secondary-lighter">
                      <span @click="ui.aboutProduct = true; ui.qualities = false" :class="{ 'c-primary' : ui.aboutProduct}" class="mr20 pointer">About product</span>
                      <span @click="ui.aboutProduct = false; ui.qualities = true" :class="{ 'c-primary' : ui.qualities}" class="pointer">Qualities</span>
                    </div>
                    <div v-if="ui.aboutProduct" v-html="product.description" class="col-md-12 mt10"></div>
                    <div v-if="ui.qualities" class="col-md-12 mt20">
                      <product-attribute v-bind:key="attr.attribute_code" v-for="attr in all_custom_attributes" :product="product" :attribute="attr" emptyPlaceholder="N/A"></product-attribute>
                    </div>
                  </div>
              </div>
          </div>
          <div class="row py60 center-xs">
            <div class="col-md-12 animate">
              <h2 class="mb40">Similar products</h2>
              <similar-pdoducts :number="4" classes="col-md-3 b"/>
            </div>
          </div>
      </div>
  </div>
</template>


<script>
import { corePage } from 'lib/themes'

import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import ProductAttribute from 'theme/components/core/blocks/Product/ProductAttribute'
import ColorFilter from 'theme/components/core/ColorFilter'
import SizeFilter from 'theme/components/core/SizeFilter'
import SimilarPdoducts from 'theme/components/core/blocks/Product/SimilarProducts'

export default {
  data () {
    return {
      availability: {
        checked: false,
        available: true
      },
      ui: {
        aboutProduct: true,
        qualities: false,
        savedToWishlist: false
      },
      scrollReveal: null
    }
  },
  computed: {
    availabilityLabel () {
      let text = this.availability.checked ? (this.availability.available ? 'Product in stock' : 'No product in stock') : 'Check availability'
      return text
    }
  },
  methods: {
    isAvailable () {
      this.availability.checked = true
      this.availability.available = this.product.stock.is_in_stock
    },
    addToWishlist () {
      this.$store.dispatch('wishlist/addItem', this.product)
      this.ui.savedToWishlist = true
    },
    resetProductState () {
      this.ui.savedToWishlist = false
      this.availability.checked = false
    }
  },
  mounted () {
    require('scrollreveal')().reveal('.animate', {
      distance: 0,
      scale: 0.8,
      duration: 600,
      viewFactor: 0.5
    })
  },
  watch: {
    '$route': 'resetProductState'
  },
  components: {
    Breadcrumbs,
    ProductAttribute,
    ColorFilter,
    SizeFilter,
    SimilarPdoducts
  },
  mixins: [corePage('Product')]
}
</script>

<style lang="scss" scoped>
@import "~theme/css/mixins/transitions";
button {
  outline: none;
}
.availibility-btn {
    @include transition;
    width: 300px;
    cursor: pointer;
}
</style>

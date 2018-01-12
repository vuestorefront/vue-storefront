<template>
  <div id="product">
    <section class="bg-lightgray py35 px20">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
          </div>
        </div>
        <section class="row py35">
          <div class="col-xs-12 col-md-7 center-xs middle-xs">
            <transition name="fade" appear>
              <img class="product-image" v-lazy="imgObj" ref="image"/>
            </transition>
          </div>
          <div class="col-md-5">

            <h1 class="mb25 mt0 c-black"> {{ product.name | htmlDecode }} </h1>
            <div v-if="product.type_id !== 'grouped'">
              <div class="h3 c-gray" v-if="product.special_price && product.priceInclTax && product.originalPriceInclTax">
                <span class="price-special">{{ product.priceInclTax | price }}</span>&nbsp;
                <span class="price-original" >{{ product.originalPriceInclTax | price }}</span>
              </div>
              <div class="h3 c-gray" v-if="!product.special_price && product.priceInclTax">
                {{ product.priceInclTax | price }}
              </div>
            </div>

            <div class="variants" v-if="product.type_id =='configurable' && !loading">
              <div class="h4" v-for="(option, index) in product.configurable_options" :key="index">
                <span>{{ option.label }} <strong>{{ configuration[option.label.toLowerCase()].label }}</strong></span>
                <div class="mt20 mb45">
                  <color-button v-for="(c, i) in options.color" :key="i" :id="c.id" :label="c.label" context="product" code="color" class="mr10" :class="{ active: c.id == configuration.color.id }" v-if="option.label == 'Color'" />
                  <size-button v-for="(s, i) in options.size" :key="i" :id="s.id" :label="s.label" context="product" code="size" class="mr10" :class="{ active: s.id == configuration.size.id }" v-if="option.label == 'Size'" v-focus-clean />
                  <router-link to="/size-guide" v-if="option.label == 'Size'" class="p0 ml30 action size-guide">
                    <i class="pr5 material-icons">accessibility</i>
                      Size guide
                  </router-link>
                </div>
              </div>
            </div>

            <product-links v-if="product.type_id =='grouped' && !loading" :products="product.product_links"/>

            <add-to-cart :product="product" class="h4 bg-black c-white px55 mt55 py20 brdr-none" />
            <div class="row pt45">
              <div class="col-xs-6 col-md-5">
                <button class="p0 bg-transparent brdr-none action" @click="addToFavorite">
                  <i class="pr5 material-icons">{{ favorite.icon }}</i>
                    Add to favorite
                </button>
              </div>
              <div class="col-xs-6">
                <button class="p0 bg-transparent brdr-none action" @click="addToCompare">
                  <i class="pr5 material-icons">compare</i>
                    <span v-if="!compare.isCompare">
                      Add to compare
                    </span>
                    <span v-else>
                      Remove from compare
                    </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>

    <section class="container pt50 pb20 px40 c-black">
      <h2 class="h3 m0 mb10 sans-serif">Product details</h2>
      <div class="row between-md">
        <div class="col-md-5">
          <div class="lh30 h4 c-gray-secondary" v-html="product.description"></div>
        </div>
        <div class="col-md-6">
          <ul class="attributes h4 p0 pt10 m0">
            <product-attribute v-bind:key="attr.attribute_code" v-for="attr in all_custom_attributes" :product="product" :attribute="attr" emptyPlaceholder="N/A"></product-attribute>
          </ul>
        </div>
      </div>
    </section>

    <!-- Replace with slider -->
  <related-products />
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import RelatedProducts from '../components/core/blocks/Product/Related.vue'
import AddToCart from '../components/core/AddToCart.vue'
import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'
import ProductTile from '../components/core/ProductTile.vue'
import ProductLinks from '../components/core/ProductLinks.vue'

export default {
  data () {
    return {
    }
  },
  asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
  },
  methods: {
  },
  components: {
    AddToCart,
    ColorButton,
    SizeButton,
    Breadcrumbs,
    ProductAttribute,
    ProductTile,
    RelatedProducts,
    ProductLinks
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
.link-header {
  font-weight: bold;
}

.product-name {
  font-size: 14px;
}
.price-original {
  text-decoration: line-through;
  font-size: smaller;
}
.price-special {
  color: red;
}
.action {
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;
  color: #BDBDBD;
  cursor: pointer;
}
.action:hover {
  color: #828282;
}
.attributes {
  list-style-type: none;
}
.size-guide {
  position: relative;
  top: 6px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
.product-image {
  display: inline-flex;
  mix-blend-mode: multiply;
  max-width: 100%;
  width: 460px;
}
.perfect-match {
  mix-blend-mode: darken;
}
</style>

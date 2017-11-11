<template>
  <div id="product">
    <div class="bg-lightgray py35 pl20 px20">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
          </div>
        </div>
        <div class="row py35">
          <div class="col-md-7 center-md middle-md">
            <transition name="fade" appear>
              <img class="product-image" v-lazy="imgObj" ref="image"/>
            </transition>  
          </div>
          <div class="col-md-5">

            <h1 class="mb10 c-black"> {{ product.name }} </h1>
            <div class="h3 c-darkgray mb35">
              {{ product.price | price }}
            </div>

            <div class="variants" v-if="product.type_id =='configurable'">
              <div class="h4" v-for="option in product.configurable_options">
                <span>{{ option.label }}
                  <strong>{{ configuration[option.label.toLowerCase()].label }}</strong>
                </span>
                <div class="mt10">
                  <color-button v-for="c in options.color" :id="c.id" :label="c.label" context="product" code="color" class="mr10" :class="{ active: c.id == configuration.color.id }" v-if="option.label == 'Color'" />
                  <size-button v-for="s in options.size" :id="s.id" :label="s.label" context="product" code="size" class="mr10" :class="{ active: s.id == configuration.size.id }" v-if="option.label == 'Size'"/>
                </div>
              </div>

            </div>
            <add-to-cart :product="configured_product" class="h4 bg-black c-white px55 py20 brdr-none mt50" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container mb15 c-black">
        <div class="row py35 px20">
          <div class="col-md-9">
            <h2 class="h3 sans-serif">Description</h2>
            <span class="lh30 h5" v-html="product.description"></span>
          </div>
          <!-- Needs to be fixed, hidden for the demo purposes -->
          <!-- <div class="col-md-3">
            <h2 class="h3 sans-serif">Product details</h2>
            <ul>
              <product-attribute v-bind:key="attr.attribute_code" v-for="attr in all_custom_atributes" :product="product" :attribute="attr" emptyPlaceholder="N/A"></product-attribute>
            </ul>
            
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import AddToCart from '../components/core/AddToCart.vue'
import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import ProductAttribute from '../components/core/ProductAttribute.vue'

import { thumbnail } from 'src/lib/filters'

export default {
  computed: {
    imgObj () {
      return {
        src: thumbnail(this.product.image, 570, 569),
        error: thumbnail(this.product.image, 310, 300),
        loading: thumbnail(this.product.image, 310, 300)
      }
    }
  },
  components: {
    AddToCart,
    ColorButton,
    SizeButton,
    Breadcrumbs,
    ProductAttribute
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
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
</style>

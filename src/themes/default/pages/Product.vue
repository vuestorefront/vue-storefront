<template>
  <div id="product">
    <div class="bg-lightgray py35">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" />
          </div>
        </div>
        <div class="row py35">
          <div class="col-md-7 center-md middle-md">
            <img class="product-image" v-bind:src="thumbnail" />
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
                  <color-button v-for="c in options.color" :id="c.id" :label="c.label" code="color" class="mr10" v-if="option.label == 'Color'" />
                  <size-button v-for="s in options.size" :id="s.id" :label="s.label" code="size" class="mr10" v-if="option.label == 'Size'"/>

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
        <div class="row py35">
          <div class="col-md-12">
            <h2 class="h3 sans-serif">Product details</h2>
            <h2 class="h3 sans-serif">Description</h2>
            <span class="lh30 h5" v-html="product.description"></span>
          </div>
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

import { thumbnail } from 'src/lib/filters'

export default {
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 570, 569)
    }
  },
  components: {
    AddToCart,
    ColorButton,
    SizeButton,
    Breadcrumbs
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
.product-image {
  display: inline-flex;
  mix-blend-mode: multiply;
}
</style>

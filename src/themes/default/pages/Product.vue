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

            <h1 class="mb10"> {{ product.name }} </h1>
            <div class="h3 c-darkgray mb35">
              {{ product.price | price }}
            </div>

            <div class="h4">
              <span>Color
                <strong>Blue</strong>
              </span>
              <div class="mt10">
                <color-button v-for="c in colors" :color="c" class="mr10" />
              </div>
            </div>

            <div class="h4 mt25">
              <span>Size
                <strong>34</strong>
              </span>
              <div class="mt10">
                <size-button v-for="s in sizes" :size="s" class="mr10" />
              </div>
            </div>
            <add-to-cart :product="product" class="h4 bg-black c-white px55 py20 brdr-none mt50" />
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="container">
        <div class="row py35">
          <div class="col-md-12">
            <h2 class="h3 sans-serif">Product description</h2>
            <span v-html="product.description"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'

import { thumbnail } from 'src/lib/filters'

export default {
  data () {
    return {
      breadcrumbs: {
        routes: [],
        name: ''
      },
      // TO-DO: Variants should be in product object
      colors: [
        'red',
        'black',
        'blue'
      ],
      sizes: [
        '31',
        '32',
        '33',
        '34',
        '35'
      ]
    }
  },
  computed: {
    thumbnail () {
      return thumbnail(this.product.image, 570, 569)
    }
  },
  components: {
    ColorButton,
    SizeButton
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
.product-image {
  display: inline-flex;
}
</style>

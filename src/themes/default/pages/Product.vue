<template>
  <div id="product">
    <div id="category">
      <div class="bg-lightgray py35">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="breadcrumbs.name" /> 
            </div>
          </div>
          <div class="row py35">
            <div class="col-md-7">
              .
            </div>
            <div class="col-md-5">
              <h1 class="mb10"> {{ product.name }} </h1>
              <div class="h3 c-darkgray mb35">
                {{ product.price | price }}
              </div>
              <div class="h4">
                <span>Color <strong>Blue</strong></span>
                <div class="mt10">
                  <color-button v-for="c in colors" :color="c" />                                  
                </div>
              </div>
              <div class="h4">
                <span>Size <strong>34</strong></span>
                <div class="mt10">
                  <size-button v-for="s in sizes" :size="s" />                                  
                </div>
              </div>
            </div>  
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'
import breadcrumbsData from 'src/resource/breadcrumbs.json'

import ColorButton from '../components/core/ColorButton.vue'
import SizeButton from '../components/core/SizeButton.vue'

export default {
  data () {
    return {
      breadcrumbs: {
        routes: breadcrumbsData.routes,
        name: 'Lorem ipsum'
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
  components: {
    ColorButton,
    SizeButton
  },
  mixins: [corePage('Product')]
}
</script>

<style scoped>
</style>

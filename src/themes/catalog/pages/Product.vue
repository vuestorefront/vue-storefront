<template>
  <div id="product">
      <div class="container mt40">
          <div class="row">
              <div class="animate image col-md-7">
                  <img class="full-width" src="/assets/product.png" alt="">
              </div>
              <div class="animate col-md-5">
                  <div class="row">
                      <div class="col-md-12">
                          <h1 class="mt0">{{ product.name }}</h1>
                      </div>
                  </div>
                  <div class="row mb10">
                      <div class="fs-large col-md-12">
                          {{ product.price | price }}
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12 uppercase c-secondary">
                        <h4>Available colors</h4>
                      </div>
                      <div class="col-md-12">
                        <color-filter class="mr5" color="#2F80ED" :active="true" />
                        <color-filter class="mr5" color="#BDBDBD" :active="false" />
                        <color-filter class="mr5" color="#ED5B5B" :active="false" />
                        <color-filter class="mr5" color="#F2994A" :active="false" />
                      </div>
                  </div>
                  <div class="row mt10">
                      <div class="col-md-12 uppercase c-secondary">
                        <h4>Sizes</h4>
                      </div>
                      <div class="col-md-12">
                        <size-filter class="mr10" size="XS" :active="true" />
                        <size-filter class="mr10" size="S" :active="false" />
                        <size-filter class="mr10" size="M" :active="false" />
                        <size-filter class="mr10" size="L" :active="false" />
                        <size-filter class="mr10" size="XL" :active="false" />
                      </div>
                  </div>
                    <div class="row mt30">
                      <div class="col-md-12">
                          <button 
                            class="availibility-btn c-on-accent fs-large b-none py20 medium"
                            :class="{ 'bg-accent' : !availability.checked, 
                                      'bg-btn-positive' : availability.checked || availability.available, 
                                      'bg-btn-positive' : availability.checked || !availability.available }"
                            @click="isAvailable()"> {{ availabilityLabel }}</button>
                      </div>
                  </div>
                  <div class="row mt40 fs-medium-small">
                    <div class="col-md-12 uppercase bold c-secondary-lighter">
                      <span class="c-primary mr20">About product</span>
                      <span>Qualities</span>
                    </div>
                    <div v-html="product.description" class="col-md-12 mt10"></div>
                  </div>
              </div>
          </div>
          <div class="row py60 center-xs">
            <div class="col-md-12 animate">
              <h2 class="mb40">Similar products</h2>
              <similar-pdoducts number="4" classes="col-md-3 b"/>
            </div>
          </div>
      </div>
  </div>
</template>


<script>
import { corePage } from 'lib/themes'

import ColorFilter from 'theme/components/core/ColorFilter'
import SizeFilter from 'theme/components/core/SizeFilter'
import SimilarPdoducts from 'theme/components/core/blocks/Product/SimilarProducts'

export default {
  data () {
    return {
      availability: {
        checked: false,
        available: true
      }
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
      this.availability.available = true
    }
  },
  mounted () {
    const ScrollReveal = require('scrollreveal')()
    ScrollReveal.reveal('.animate', {
      distance: 0,
      scale: 0.7,
      duration: 1000,
      viewFactor: 0.5
    })
  },
  components: {
    ColorFilter,
    SizeFilter,
    SimilarPdoducts
  },
  asyncData ({ store, route }) {},
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

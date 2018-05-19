<template>
  <div class="collection">
    <div class="container">
      <div class="row center-xs">
        <header class="col-md-12 pb15">
          <h2 class="align-center cl-accent">
            {{ title }}
          </h2>
        </header>
      </div>
    </div>
    <div class="bg-cl-secondary collection-slider">
      <div class="row">
        <div class="col-md-12">
          <div class="pb20 pt20 center-xs cool-stuff-collection">
            <no-ssr>
              <carousel v-bind="config" @pageChange="setMuted">
                <slide
                  v-for="(product, index) in products"
                  :key="product.id"
                >
                  <product-tile
                    class="collection-product"
                    :product="product"
                    :class="{'is-muted': (currentPage == index || index == currentPage + 5)}"
                    :labels-active="false"
                    :instant="false"
                  />
                </slide>
              </carousel>
            </no-ssr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import productsSlider from 'core/components/ProductsSlider'
import NoSSR from 'vue-no-ssr'
import { Carousel, Slide } from 'vue-carousel'
import ProductTile from 'theme/components/core/ProductTile.vue'

export default {
  data () {
    return {
      currentPage: 0
    }
  },
  methods: {
    setMuted (currentPage) {
      this.currentPage = currentPage
    }
  },
  mixins: [productsSlider],
  components: {
    Slide,
    Carousel,
    ProductTile,
    'no-ssr': NoSSR
  }
}
</script>

<style lang="scss">
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-product-bg: color(secondary, $colors-background);

.collection-slider {
  overflow: hidden;
}

.cool-stuff-collection {
  @media (min-width: 1024px) {
    margin: 0 -130px;
  }

  @media (max-width: 767px) {
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

.product {
  &.collection-product {
    padding: 15px;
  }

  &.is-muted {
    opacity: 0.5;
  }
}

.collection-product {
  .product-image {
    height: auto;
    will-change: opacity;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
    }
  }
}
</style>

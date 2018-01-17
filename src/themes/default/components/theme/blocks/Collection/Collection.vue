<template>
  <div class="collection">

    <div class="container">
      <div class="row center-xs">
        <header class="col-md-12 pt40 pb15">
          <h2 class="align-center c-black">{{title}}</h2>
        </header>
      </div>
    </div>


  <div class="bg-lightgray collection-slider">
    <div class="row">
      <div class="col-md-12">
        <div class="pb20 pt20 center-xs cool-stuff-collection">
          <no-ssr>
            <carousel :perPage="6" :paginationEnabled="false" :autoplay="true" :loop="true" ref="carousel">
              <slide v-for='(product, index) in products' v-bind:key='product.id'>
                <product-tile class="collection-product" :product="product"  v-bind:class="{'is-muted': (currentIndex == index || index == currentIndex + 5)}"/>
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
  import NoSSR from 'vue-no-ssr'
  import { Carousel, Slide } from 'vue-carousel'
  import builder from 'bodybuilder'
  import ProductTile from 'theme/components/core/ProductTile.vue'

  export default {
    name: 'Collection',
    props: ['title', 'coverImage', 'category'],
    data () {
      return {
        products: []
      }
    },
    computed: {
      currentIndex: {
        cache: false,
        get () {
          return this.$refs.carousel ? this.$refs.carousel.currentPage : 0
        }
      }
    },
    beforeMount () {
      let self = this
      let inspirationsQuery = builder().query('match', 'category.name', this.category).build()

      self.$store.dispatch('product/list', {
        query: inspirationsQuery,
        size: 12,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          self.products = res.items
        }
      })
    },
    components: {
      Slide,
      Carousel,
      ProductTile,
      'no-ssr': NoSSR
    }
  }
</script>
<style lang="scss">
.collection-slider {
  overflow: hidden;
}
//TO-DO: Clean blending mode mess on products!
.product {
  &.collection-product {
     background-color: #f2f2f2;
     padding: 15px;
  }

  &.is-muted {
    @media (min-width: 1024px) {
      opacity: 0.5;
    }
  }
}

.collection-product .product-image {
  //TO-DO: Should be global
  mix-blend-mode: darken;
  height: auto;

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
  }
}

.cool-stuff-collection {
  @media (min-width: 1024px) {
    margin: 0 -130px;
  }
}
</style>

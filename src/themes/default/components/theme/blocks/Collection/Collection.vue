<template>
  <div class="collection">

    <div class="container">
      <div class="row center-xs">
        <header class="col-md-12 pt40 pb15">
          <h2 class="align-center">{{title}}</h2>
        </header>
      </div>
    </div>


  <div class="bg-lightgray">
    <div class="row">
      <div class="col-md-12">
        <div class="row pb45 pt45 center-xs cool-stuff-collection">
          <no-ssr>
            <carousel :perPage="5" :paginationEnabled="false" :autoplay="true" class="col-md-12">
              <slide class="row" v-for='product in products' v-bind:key='product.id' >
                <product-tile class="col-md-12 collection-product" :product="product"/>
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
//TO-DO: Clean blending mode mess on products!
.collection-product {
  background-color: #f2f2f2;
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

  .colection-cover {
    @media (max-width: 767px) {
      display: none;
    }

    img {
      width: 100%;
      mix-blend-mode: multiply;
    }
  }
</style>

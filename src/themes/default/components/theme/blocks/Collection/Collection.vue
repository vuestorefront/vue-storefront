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
    <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="row pb45 pt45 center-xs cool-stuff-collection">
            <product-tile  v-for='product in products' v-bind:key='product.id' class="col-md-3" :product="product"/>
        </div>
      </div>    
    </div>
    </div>
  </div>
  </div>
</template>
<script>
  import builder from 'bodybuilder'
  import ProductTile from 'theme/components/core/ProductTile.vue'

  export default {
    name: 'Collection',
    components: { ProductTile },
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
        size: 4,
        sort: 'created_at:desc'
      }).then(function (res) {
        if (res) {
          self.products = res.items
        }
      })
    }
  }
</script>
<style lang="scss">
  .collection-product .product-image {
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

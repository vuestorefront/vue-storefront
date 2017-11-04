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
        <div class="row bottom-md middle-sm center-xs pt45">
          <div class="col-md-6 col-sm-5 col-xs-8 colection-cover">
            <img :src="coverImage">
          </div>
          <div class="col-md-6 col-sm-7">
            <div class="row pb45 center-xs">
              <product-tile  v-for='product in products' v-bind:key='product.id' class="col-sm-6 collection-product" :product="product"/>
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
        self.products = res.items
      })
    }
  }
</script>
<style lang="scss">
  .collection-product .product-image {
    mix-blend-mode: normal;
    height: auto;

    img {
      max-width: 100%;
      max-height: 100%;
      height: auto;
    }
  }

  .colection-cover {
    img {
      width: 100%;
      mix-blend-mode: multiply;
    }
  }
</style>

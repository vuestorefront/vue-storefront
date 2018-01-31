<template>
  <div id="page_not_found">
    <section class="bg-lightgray py35 px20">
      <div class="container">
        <h2>We can't find the page</h2>
      </div>
    </section>
    <section class="bg-white py35 px20">
      <div class="container">
        <div class="lh16 h5 weight-400">
          <p>Unfortunately we can't find the page you are looking for.</p>
          <p>If you need an assistance you can drop us a line on <router-link to="/" class="c-gray-secondary no-underline">a chat</router-link> or write to us through <router-link to="/contact" class="c-gray-secondary no-underline">a contact page</router-link>.</p>
          <p>You can also use <a href="#" class="c-gray-secondary no-underline" @click="toggleSearchpanel">search</a> to find product you were looking for.</p>
        </div>
        <section class="container">
          <header class="col-md-12 pt40">
            <h3 class="align-center">See our bestsellers</h3>
          </header>
          <div class="row center-xs">
            <div v-for="(product, key) in ourBestsellersCollection" :key="product.id" class="col-md-3">
              <product-tile :instant="key < 4 ? true : false" :product="product"/>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
  import { corePage } from 'lib/themes'
  import ProductTile from '../components/core/ProductTile.vue'

  export default {
    name: 'PageNotFound',
    computed: {
      ourBestsellersCollection () {
        return this.$store.state.homepage.bestsellers
      }
    },
    components: {
      ProductTile
    },
    methods: {
      toggleSearchpanel () {
        this.$bus.$emit('focusSearchInput')
        this.$store.commit('ui/setSearchpanel', true)
      }
    },
    mixins: [corePage('PageNotFound')]
  }
</script>

<style scoped>
  a {
    text-decoration: underline;
  }
</style>
<template>
  <div id="page_not_found">
    <section class="bg-cl-secondary py35 px20">
      <div class="container">
        <h2>
          {{ $t("We can't find the page") }}
        </h2>
      </div>
    </section>
    <section class="bg-cl-primary py35 px20">
      <div class="container">
        <div class="lh16 h5 weight-400">
          <p>
            {{ $t("Unfortunately we can't find the page you are looking for.") }}
          </p>
          <p>
            {{ $t('If you need an assistance you can drop us a line on') }}
            <router-link :to="localizedRoute('/')" class="cl-secondary no-underline">
              {{ $t('a chat') }}
            </router-link>
            {{ $t('or write to us through') }}
            <router-link :to="localizedRoute('/contact')" class="cl-secondary no-underline">
              {{ $t('a contact page') }}
            </router-link>.
          </p>
          <p>
            {{ $t('You can also use') }}
            <a href="#" class="cl-secondary no-underline" @click="toggleSearchpanel">
              {{ $t('search') }}
            </a>
            {{ $t('to find product you were looking for.') }}
          </p>
        </div>
        <section class="container">
          <header class="col-md-12 pt40">
            <h3 class="align-center">
              {{ $t('See our bestsellers') }}
            </h3>
          </header>
          <div class="row center-xs">
            <div v-for="product in ourBestsellersCollection" :key="product.id" class="col-md-3">
              <product-tile :product="product"/>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import PageNotFound from '@vue-storefront/core/pages/PageNotFound'
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
  mixins: [PageNotFound]
}
</script>

<style scoped>
  a {
    text-decoration: underline;
  }
</style>

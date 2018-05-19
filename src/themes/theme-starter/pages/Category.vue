<template>
  <div id="category">
    <!-- You can find everything in 'category' object -->
    <h1>Category Page: {{ category.name }} </h1>
    <div><router-link to="/">Back to home </router-link></div>
    <product-tile v-for="product in products" :product="product" :key="product.name"/>
    <div v-if="isCategoryEmpty">
      Category is empty
    </div>
  </div>
</template>

<script>
// Here we are importing Core Page module responsible for business logic injection
import Category from 'core/pages/Category.vue'
import ProductTile from 'theme/components/ProductTile' // Component to display small product tile

export default {
  // Here we are injecting core Category Page business logic (you can find it under core/pages/Product.vue)
  // You can find the docs for Category Page here: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/CategoryPage.md
  data () {
    return {
      lazyLoadProductsOnscroll: true
    }
  },
  components: {
    ProductTile
  },
  mixins: [Category]
}
</script>

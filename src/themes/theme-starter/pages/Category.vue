<template>
  <div id="category">
    <!-- You can find everything in 'category' object -->
    <h1>Category Page: {{ category.name }} </h1>
    <div class="row">
      <div class="col-md-3">
        <Sidebar :filters="filters.available"/>
      </div>
      <div class="col-md-9">
        <div class="row">
          <div v-if="isCategoryEmpty" class="col-12">
            Category is empty
          </div>
          <product-tile v-for="product in products" :product="product" :key="product.name" class="col-md-3 col-sm-4 col-xs-12"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Here we are importing Core Page module responsible for business logic injection
<<<<<<< HEAD
import { corePage } from 'core/lib/themes'

import Sidebar from 'theme/components/Category/Sidebar'
=======
import Category from 'core/pages/Category.vue'
>>>>>>> upstream/develop
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
    ProductTile,
    Sidebar
  },
  mixins: [Category]
}
</script>

<template>
  <div id="category">
    <header class="bg-lightgray py35 pl20">
        <div class="container">
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
            <h1 class="mb10"> {{ category.name }} </h1> 
        </div>
    </header>
    <div class="container pb60">
        <div class="row pt15 pl20 center-md">
            <div class="col-md-3 start-xs">
                <sidebar :filters="filters"/>
            </div>
            <div class="col-md-9 pt20">
                <div v-if="isCategoryEmpty">
                    No products found!
                </div>
                <product-listing columns="3" :products="products" />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  components: {
    ProductListing,
    Breadcrumbs,
    Sidebar
  },
  mixins: [corePage('Category')]
}
</script>

<style scoped>

</style>

<template>
  <div id="category">
    <header class="bg-lightgray py35">
        <div class="container">
            <!-- There will be breadcrumbs -->
            <breadcrumbs :routes="breadcrumbs.routes" :active-route="category.name" />
            <h1 class="mb10"> {{ category.name }} </h1>
        </div>
    </header>
    <div class="container pb60">
        <div class="row pt15">
            <div class="col-md-3">
                <sidebar :filters="filters"/>
            </div>
            <div class="col-md-9 pt20">
                <div class="row">
                    <div v-if="isCategoryEmpty">
                        No products found!   
                    </div>  
                    <div v-for="product in products" class="col-md-4 p15">
                        <product-tile :product="product" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { corePage } from 'lib/themes'

import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductTile from '../components/core/ProductTile.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'

export default {
  components: {
    ProductTile,
    Breadcrumbs,
    Sidebar
  },
  mixins: [corePage('Category')]
}
</script>

<style scoped>

</style>

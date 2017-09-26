<template>
  <div id="category">
    <header>
        <div class="container">
            <!-- There will be breadcrumbs -->
            <h1> {{ category.name }} </h1>
        </div>
    </header>
    <div class="container pb60">
        <div class="row">
            <div class="col-md-3">
                Sidebar
            </div>
            <div class="col-md-9">
                <div class="row">
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
// TO-DO @Piotr jak będziesz sie tym bawił to w route param w core jest nazwa kategorii, trzebaby jej użyć jako parametr do dispatchera żeby wyświetlało odpowiednią kategorie zamiast wszystkich produktów,
//  jak opiszesz jak ma wygladać API dla filtrowania produktów po parametrach to zrobię jak wróce
import { corePage } from 'lib/themes'
import ProductTile from '../components/core/ProductTile.vue'

export default {
  components: {
    ProductTile
  },
  mixins: [corePage('Category')]
}
</script>

<style scoped>

</style>

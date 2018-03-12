<template>
  <div id="category">
    <h1>Category Page </h1>
    <router-link to="/">Back to home </router-link>
    <h2> Category JSON </h2>
    <p> {{ category }} </p>
  </div>
</template>

<script>
// Here we are importing Core Page module responsible for business logic injection
import { corePage } from 'core/lib/themes'

export default {
  // Here we are injecting core Category Page business logic (you can find it under core/pages/Product.vue)
  // You can find the docs for Category Page here: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/components/core/CategoryPage.md
  mixins: [corePage('Category')]
}
</script>

<template>
  <div id="hp">
      Core Home
  </div>
</template>

<script>
<<<<<<< HEAD
import AddToCart from '../components/core/AddToCart.vue'

export default {
  name: 'Home',
  created () {
    this.$store.dispatch('cart/loadCart')
    this.$store.dispatch('catalog/loadCategories')
=======
import ProductTile from '../components/core/ProductTile.vue'

export default {
  name: 'Home',
  beforeMount () {
    this.$store.dispatch('loadCart')
    this.search()
>>>>>>> base-components
  },
  components: {
    ProductTile
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="hp">
      Hello World!
  </div>
</template>

<script>
import AddToCart from '../components/core/AddToCart.vue'

export default {
  name: 'Home',
  created () {
    this.$store.dispatch('cart/loadCart')
    this.$store.dispatch('catalog/loadCategories')
  },
  data () {
    return {
      'exampleData': 'Data from base component'
    }
  },
  components: {
    AddToCart
  }
}
</script>

<style scoped>

</style>

<template>
    <!-- Add to cart button example with addToCart action -->
    <button v-on:click="addToCart(product)">Add to cart</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'add-to-cart',
  props: ['product'],
  methods: {
    ...mapActions({'addToCart' : 'cart/addToCart'})
  }
}
</script>

<style scoped>

</style>

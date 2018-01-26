<template>
    <!-- Add to cart button example with addToCart action from cart store-->
    <button v-on:click="addToCart(product)">Add to cart</button>
</template>

<script>
export default {
  name: 'add-to-cart',
  props: ['product'],
  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}
</script>

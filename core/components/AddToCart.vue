<template>
  <!-- Add to cart button example with addToCart action from cart store-->
  <button @click="addToCart(product)">Add to cart</button>
</template>

<script>
export default {
  name: 'AddToCart',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}
</script>

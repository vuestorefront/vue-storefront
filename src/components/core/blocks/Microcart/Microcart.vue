<template>
  
</template>

<script>
export default {
  name: 'microcart',
  props: ['product'],
  computed: {
    cartItems () {
      return this.$store.state.cart.items
    }
  }
}
</script>


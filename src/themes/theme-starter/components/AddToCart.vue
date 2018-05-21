<template>
  <button @click="addToCart(product)">Add to cart</button>
</template>

<script>
import AddToCart from 'core/components/addToCart'

export default {
  mixins: [AddToCart]
}
</script>

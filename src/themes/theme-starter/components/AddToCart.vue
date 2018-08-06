<template>
  <button @click="addToCart(product)">Add to cart</button>
</template>

<script>
import AddToCart from '@vue-storefront/core/components/AddToCart'

export default {
  mixins: [AddToCart]
}
</script>

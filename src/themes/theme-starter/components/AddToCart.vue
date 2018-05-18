<template>
  <button @click="addToCart(product)">Add to cart</button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('AddToCart')]
}
</script>

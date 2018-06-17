<template>
  <button @click="addToCart(product)">Click</button>
</template>

<script>
import { addToCart } from '../addToCart'

export default {
  data () {
    return {
      product: 'productString'
    }
  },
  mixins: [addToCart]
}
</script>

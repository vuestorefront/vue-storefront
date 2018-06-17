<template>
  <div>
    <button id="add-to-cart" @click="addToCart(product)">Click</button>
    <button id="remove-from-cart" @click="removeFromCart(product)">Click</button>
  </div>
</template>

<script>
import { addToCart, removeFromCart, productsInCart } from '../index.js'

export default {
  data () {
    return {
      product: 'productString'
    }
  },
  mixins: [addToCart, removeFromCart, productsInCart]
}
</script>

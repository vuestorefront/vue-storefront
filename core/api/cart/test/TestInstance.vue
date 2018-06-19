<template>
  <div>
    <button id="add-to-cart" @click="addToCart(product)">Click</button>
    <button id="remove-from-cart" @click="removeFromCart(product)">Click</button>
    <button id="close-microcart" @click="closeMicrocart">Click</button>
    <button id="open-microcart" @click="openMicrocart">Click</button>
  </div>
</template>

<script>
import { 
  addToCart, 
  removeFromCart, 
  productsInCart, 
  closeMicrocart,
  openMicrocart,
  isMicrocartOpen
} from '../index.js'

export default {
  data () {
    return {
      product: 'productString'
    }
  },
  mixins: [
    addToCart, 
    removeFromCart, 
    productsInCart, 
    closeMicrocart,
    openMicrocart,
    isMicrocartOpen
  ]
}
</script>

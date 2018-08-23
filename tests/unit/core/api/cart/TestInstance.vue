<template>
  <!-- Examples of usage -->
  <div>
    <button id="add-to-cart" @click="addToCart(product)">addproduct to cart</button>
    <button id="remove-from-cart" @click="removeFromCart(product)">Remove product from cart</button>
    <button id="close-microcart" @click="closeMicrocart">close microcart</button>
    <button id="open-microcart" @click="openMicrocart">Open microcart</button>
  </div>
</template>

<script>
// Just import the features that you need in the view grouped in modules
import {
  addToCart,
  removeFromCart,
  productsInCart,
  closeMicrocart,
  openMicrocart,
  isMicrocartOpen
} from '@vue-storefront/core/modules/cart'

export default {
  data () {
    return {
      product: 'productObjectMock'
    }
  },
  // And register them as a mixins
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

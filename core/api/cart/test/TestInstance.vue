<template>
  <!-- Examples of usage -->
  <div>

  </div>
</template>

<script>
// Just import the features that you need in the view grouped in modules
import { 
  isMicrocartOpen,
  openMicrocart,
  closeMicrocart,
  addToCart,
  removeFromCart,
  productsInCart
} from 'core/api/cart'

export default {
  data () {
    return {
      product: 'productObjectMock'
    }
  },
  // And register them as a mixins
  mixins: [

  ]
}
</script>

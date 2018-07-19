import { removeFromCart } from './removeFromCart'
import { productsInCart } from './productsInCart'
import { closeMicrocart } from './ui/closeMicrocart'
import { openMicrocart } from './ui/openMicrocart'
import { isMicrocartOpen } from './ui/isMicrocartOpen'

export const addToCart = {
  methods: {
    addToCart (product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}

export {
  removeFromCart,
  productsInCart,
  closeMicrocart,
  openMicrocart,
  isMicrocartOpen
}

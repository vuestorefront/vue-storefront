/**
 * Functionality for removing product from the cart.
 *
 * #### Methods
 * - **`removeFromCart(product)`** removes passed product from the cart (basing on `sku` & `parentSku`). Dispatches `cart/removeItem` Vuex action.
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
 import CartItem from '../types/CartItem'

 export const removeFromCart = {
  methods: {
    removeFromCart (item: CartItem) {
      this.$store.dispatch('cart/removeItem', item)
    }
  }
}

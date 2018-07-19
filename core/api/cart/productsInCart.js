/**
 * Functionality for returning products in cart.
 * 
 * #### Computed properties
 * - **`productsInCart`** returns products in cart. Returns `cart/cartItems` Vuex state.
 * 
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const productsInCart = {
  computed: {
    productsInCart () {
      return this.$store.state.cart.cartItems
    }
  }
}

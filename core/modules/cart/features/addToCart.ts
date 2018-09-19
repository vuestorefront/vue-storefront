import Product from '@vue-storefront/store/types/product/Product'
/**
 * Functionality for adding product to the cart.
 *
 * #### Methods
 * - **`addToCart(product)`** adds passed product to the cart. Dispatches `cart/addItem` Vuex action
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const addToCart = {
  methods: {
    addToCart (product: Product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}

import Product from '@vue-storefront/store/types/product/Product'
/**
 * Functionality for cancelling orders placed offline
 *
 * #### Methods
 * - **`cancelOrders()`** removes not transmitted orders from Local Storage
 *
 * Part of [Offline order API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const AddToCart = {
  name: 'AddToCart',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  methods: {
    addToCart (product: Product) {
      this.$store.dispatch('cart/addItem', { productToAdd: product })
    }
  }
}

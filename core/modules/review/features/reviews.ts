/**
 * Functionality for returning reviews list for current product.
 *
 * #### Computed properties
 * - **`reviews`** returns reviews for current product. Returns `review/items` Vuex state.
 *
 * Part of [Review API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const reviews = {
  computed: {
    reviews () : any[] {
      return this.$store.state.review.items.items || []
    }
  }
}

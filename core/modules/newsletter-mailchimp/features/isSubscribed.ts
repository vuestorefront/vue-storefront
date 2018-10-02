/**
 * Functionality for getting newsletter preferences of current user
 *
 * #### Computed
 * - **`isSubscribed`** gets newsletter preferences of current user
 *
 * Part of [Newsletter API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const isSubscribed = {
  computed: {
    isSubscribed () {
      return this.$store.state.user.newsletter ? (this.$store.state.user.newsletter.isSubscribed ? this.$store.state.user.newsletter.isSubscribed : false) : false
    }
  }
}

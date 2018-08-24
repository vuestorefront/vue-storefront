/**
 * Functionality for getting newsletter preferences of current user
 *
 * #### Computed
 * - **`newsletterPreferences`** gets newsletter preferences of current user
 *
 * Part of [Newsletter API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const newsletterPreferences = {
  computed: {
    newsletterPreferences () {
      return this.$store.state.user.newsletter
    }
  }
}

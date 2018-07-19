/**
 * [Helper] Optional UI functionality for informing if microcart is open.
 * #### Computed properties
 * - **`isMicrocartOpen`** returns `true` if Microcart is open. Retuens `ui/microcart` Vuex state.
 * 
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const isMicrocartOpen = {
  computed: {
    isMicrocartOpen () {
      return this.$store.state.ui.microcart
    }
  }
}

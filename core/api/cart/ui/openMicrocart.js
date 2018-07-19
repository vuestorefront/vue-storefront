/**
 * [Helper] Optional UI functionality for opening microcart.
 * 
 * #### Methods
 * - **`openMicrocart`** sets `microcart` and `overlay` property from ui state to `true`. Dispatches `ui/setMicrocart'` Vuex action
 * 
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const openMicrocart = {
  methods: {
    openMicrocart () {
      this.$store.commit('ui/setMicrocart', true)
    }
  }
}

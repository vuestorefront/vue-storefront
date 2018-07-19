/**
 * [Helper] Optional UI functionality for closing microcart.
 * 
 * #### Methods
 * - **`openMicrocart`** sets `microcart` and `overlay` property from ui state to `false`. Dispatches `ui/setMicrocart'` Vuex action
 * 
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const closeMicrocart = {
  methods: {
    closeMicrocart () {
      this.$store.commit('ui/setMicrocart', false)
    }
  }
}

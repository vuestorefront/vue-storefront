/**
 * [Helper] Optional UI functionality for closing microcart.
 *
 * #### Methods
 * - **`closeMicrocart`** sets `microcart` and `overlay` property from submodules state to `false`. Dispatches `submodules/setMicrocart'` Vuex action
 *
 * Part of [Cart API Module](https://github.com/DivanteLtd/vue-storefront/tree/master/doc/api-modules)
 */
export const closeMicrocart = {
  methods: {
    closeMicrocart () {
      this.$store.commit('submodules/setMicrocart', false)
    }
  }
}

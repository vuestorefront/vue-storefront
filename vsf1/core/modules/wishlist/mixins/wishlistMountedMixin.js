/**
 * This is mixin for all module components.
 * Invoke here actions, which were not invoked on server-side render, like reading LocalStorage or checking window size.
 */

export default {
  mounted () {
    this.$store.dispatch('wishlist/load')
  }
}

export const Breadcrumbs = {
  computed: {
    routes () {
      return this.$store.state.breadcrumbs.routes
    },
    current () {
      return this.$store.state.breadcrumbs.current
    }
  }
}

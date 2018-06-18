export const openMicrocart = {
  methods: {
    openMicrocart () {
      this.$store.dispatch('ui/Microcart', true)
    }
  }
}

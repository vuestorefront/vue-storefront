export const isMicrocartOpen = {
  computed: {
    isMicrocartOpen () {
      return this.$store.state.ui.microcart
    }
  }
}

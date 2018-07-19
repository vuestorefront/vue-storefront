export const openMicrocart = {
  methods: {
    openMicrocart () {
      this.$store.commit('ui/setMicrocart', true)
    }
  }
}

export const closeMicrocart = {
  methods: {
    closeMicrocart () {
      this.$store.commit('ui/setMicrocart', false)
    }
  }
}

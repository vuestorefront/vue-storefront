// new core proposal
export default {
  methods: {
    openWishlist () {
      this.$store.commit('ui/setWishlist', true)
      this.$store.commit('ui/setOverlay', true)
    }
  }
}

export default {
  // props: {
  //   id: {
  //     required: true,
  //     type: String
  //   }
  // },
  mounted () {
    this.$store.dispatch('content/fetchContent', this.id)
  },
  computed: {
    content () {
      return this.$store.getters['content/findBlock'](this.id)
    }
  },
  beforeDestroy () {
    this.$store.commit('content/removeBlock', this.content.id)
  }
}

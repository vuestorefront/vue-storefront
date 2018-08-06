export default {
  props: {
    identifier: {
      required: true,
      type: String
    },
    type: {
      required: true,
      type: String
    }
  },
  created () {
    const config = {
      id: this.identifier,
      type: this.type
    }
    this.$store.dispatch('content/fetchBlock', config)
  },
  computed: {
    content () {
      return this.$store.getters['content/find'](this.identifier)
    }
  }
  // beforeDestroy () {
  //   this.$store.commit('content/removeBlock', this.content.id)
  // }
}

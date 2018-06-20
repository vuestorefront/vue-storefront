export default {
  props: {
    blockIdentifier: {
      required: true,
      type: String
    }
  },
  computed: {
    content () {
      return this.$store.getters.getBlock(blockIdentifier) ? this.content = this.$store.getters.getBlock(blockIdentifier) : null
    }
  },
  created () {
    if (content === null) {
      this.$store.dispatch('content/addBlock', this.blockIdentifier)
    }
  }
}


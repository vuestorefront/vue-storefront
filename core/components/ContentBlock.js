export default {
  props: {
    blockIdentifier: {
      required: true,
      type: String
    },
    clearStoreOnDestroy: {
      type: Boolean,
      default: () => true
    }
  },
  computed: {
    content () {
      return this.$store.getters.getBlock(blockIdentifier) ? this.$store.getters.getBlock(blockIdentifier) : null
    }
  },
  created () {
    if (content === null) {
      this.$store.dispatch('content/addBlock', this.blockIdentifier)
    }
  },
  destroyed () {
    if (this.clearStoreOnDestroy) {
      this.$store.commit('content/removeBlock', this.blockIdentifier)
    }
  }
}


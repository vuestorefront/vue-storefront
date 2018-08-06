export default {
  data () {
    return {
      contentConfig: {
        id: '1',
        type: 'todos'
      }
    }
  },
  mounted () {
    this.$store.dispatch('content/fetchBlock', this.contentConfig)
  }
}

export default {
  methods: {
    getContent () {
      this.store.dispatch('content/get')
    }
  }
}

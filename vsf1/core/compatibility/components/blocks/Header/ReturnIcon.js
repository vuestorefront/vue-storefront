// deprecated as theme-specific
export default {
  name: 'ReturnIcon',
  props: {
    to: {
      type: String | Object,
      default: null
    }
  },
  methods: {
    goBack () {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        this.$router.back()
      }
    }
  }
}

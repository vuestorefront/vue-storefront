import Vue from 'vue'

export default Vue.component('CompareIcon', {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  computed: {
    hasCompare () {
      return this.$store.state.compare.compare
    }
  }
})

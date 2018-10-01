
export default {
  name: 'MicrocartIcon-cart',
  methods: {
    toggleMicrocart () {
      this.$store.dispatch('ui/toggleMicrocart')
    }
  },
  computed: {
    quantity () {
      return this.$store.getters['cart/totalQuantity']
    }
  }
}


export const MicrocartButton = {
  name: 'MicrocartButton',
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

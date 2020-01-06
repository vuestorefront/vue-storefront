import { MicrocartButton } from '@vue-storefront/core/modules/cart/components/MicrocartButton.ts'

export default {
  methods: {
    openMicrocart () {
      // Method renamed to 'toggleMicrocart' and is using cart store now
      this.$store.dispatch('ui/toggleMicrocart')
    }
  },
  computed: {
    totalQuantity () {
      // Data field renamed to 'quantity'
      return this.quantity
    }
  },
  mixins: [
    MicrocartButton
  ]
}

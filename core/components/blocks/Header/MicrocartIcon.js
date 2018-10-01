import MicrocartIcon from '@vue-storefront/core/modules/cart/components/MicrocartIcon.ts'

export default {
  methods: {
    openMicrocart () {
      // Method renamed to 'toggleMicrocart'
      this.toggleMicrocart()
    }
  },
  computed: {
    totalQuantity () {
      // Data field renamed to 'quantity'
      return this.quantity
    }
  },
  mixins: [
    MicrocartIcon
  ]
}

// Core dependecies
import { Microcart } from '@vue-storefront/core/modules/cart/components/Microcart.ts'

export default {
  methods: {
    closeMicrocart () {
      // Method renamed to 'toggleMicrocart'
      this.toggleMicrocart()
    }
  },
  computed: {
    isMicrocartOpen () {
      return this.$store.state.ui.microcart
    }
  },
  mixins: [
    Microcart
  ]
}

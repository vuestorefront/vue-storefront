import { mapGetters } from 'vuex'
import { openMicrocart, isMicrocartOpen } from 'core/api/cart'

export default {
  name: 'MicrocartIcon',
  computed: {
    totalItems () {
      // return this.$store.getters.totals.quantity
      return 3
    },
    ...mapGetters({
      totals: 'cart/totals',
      totalQuantity: 'cart/totalQuantity'
    })
  },
  mixins: {
    openMicrocart,
    isMicrocartOpen
  }
}

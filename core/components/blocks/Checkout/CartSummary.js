import { mapGetters } from 'vuex'
import Microcart from 'core/components/blocks/Microcart/Microcart'

export default {
  name: 'CartSummary',
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
}

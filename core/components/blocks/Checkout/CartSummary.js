import Microcart from 'core/components/blocks/Microcart/Microcart'
import { mapGetters } from 'vuex'

export default {
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
}

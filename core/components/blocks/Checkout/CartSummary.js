import Vue from 'vue'
import Microcart from 'core/components/blocks/Microcart/Microcart'
import { mapGetters } from 'vuex'

export default Vue.component('CartSummary', {
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
})

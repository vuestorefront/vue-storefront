import Vue from 'vue'
import microcart from '../Microcart/microcart'
import { mapGetters } from 'vuex'

export default Vue.component('CartSummary', {
  mixins: [microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
})

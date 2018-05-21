import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.component('CartSummary', {
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
})

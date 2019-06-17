import { mapGetters } from 'vuex'
import Microcart from '@vue-storefront/core/compatibility/components/blocks/Microcart/Microcart'

export const CartSummary = {
  name: 'CartSummary',
  mixins: [Microcart],
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
      isVirtualCart: 'cart/isVirtualCart'
    })
  }
}

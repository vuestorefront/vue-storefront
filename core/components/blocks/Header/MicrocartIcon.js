import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    totalItems () {
      // return this.$store.getters.totals.quantity
      return 3
    },
    ...mapState({
      isOpen: state => state.ui.microcart
    }),
    ...mapGetters({
      totals: 'cart/totals',
      totalQuantity: 'cart/totalQuantity'
    })
  },
  methods: {
    openMicrocart () {
      this.$store.commit('ui/setMicrocart', !this.isOpen)
    }
  }
}

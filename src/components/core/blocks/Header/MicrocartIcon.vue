<template>
  <div class="microcart-icon">
    <!--
        methods:
        openMicrocart - opens microcart
        data to display:
        {{ totalItems }} - items in cart
      -->
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'MicrocartIcon',
  computed: {
    totalItems () {
      // return this.$store.getters.totals.quantity
      return 3
    },
    ...mapState({
      isOpen: state => state.ui.microcart
    }),
    ...mapGetters({
      totals: 'cart/totals'
    })
  },
  methods: {
    openMicrocart () {
      this.$store.commit('ui/setMicrocart', !this.isOpen)
    }
  }
}
</script>

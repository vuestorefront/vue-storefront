<template>
  <div class="microcart-icon">
      Core Microcart
      <!-- Total items in cart -->
      {{ totals.quantity }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'microcart-icon',
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
    toggleMicrocart () {
      this.$store.commit('setMicrocart', !this.isOpen)
    }
  }
}
</script>

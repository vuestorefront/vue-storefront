<template>
  <div class="microcart-icon">
      Core Microcart
      <!-- Total items in cart -->
      {{ totalItems }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'microcart-icon',
  computed: {
    totalItems () {
      // return this.$store.getters.totals.quantity
      return 3
    },
    ...mapState({
      isOpen: state => state.ui.microcart
    })
  },
  methods: {
    toggleMicrocart () {
      this.$store.commit('setMicrocart', !this.isOpen)
    }
  }
}
</script>

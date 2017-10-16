<template>
  <div class="microcart-icon">
      Core Microcart
      <!-- Total items in cart -->
      {{ totals.quantity }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'microcart-icon',
  computed: {
    ...mapGetters({
      totals: 'cart/totals'
    })
  }
}
</script>

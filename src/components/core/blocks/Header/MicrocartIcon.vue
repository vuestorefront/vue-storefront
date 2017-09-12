<template>
  <div id="microcart-icon">
      Core Microcart
      <!-- Total items in cart -->
      {{ totalItems }}
  </div>
</template>

<script>
export default {
  name: 'microcart-icon',
  computed: {
    totalItems () {
      // return this.$store.getters.totals.quantity
      return 3
    }
  }
}
</script>
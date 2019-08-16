<template>
  <ul>
    <li @click="openMicrocart">Open CartSidebar</li>
  </ul>
</template>

<script>
export default {
  methods: {
    openMicrocart () {
      this.$store.dispatch('ui/toggleCartSidebar')
    }
  }
}
</script>
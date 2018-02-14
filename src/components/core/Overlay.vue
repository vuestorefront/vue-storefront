<template>
  <div>
    Core Overlay
  </div>
</template>

<script>
export default {
  name: 'Overlay',
  computed: {
    isVisible () {
      return this.$store.state.ui.overlay
    }
  },
  methods: {
    close () {
      this.$store.commit('ui/setOverlay', false)
    }
  }
}
</script>

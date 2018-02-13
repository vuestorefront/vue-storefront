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
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setWishlist', false)
      this.$store.commit('ui/setSearchpanel', false)
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setSignUp', false)
    }
  },
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
  }
}
</script>

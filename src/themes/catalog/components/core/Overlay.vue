<template>
  <div class="overlay full-width" @click="close" v-if="isVisible" />
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  beforeCreate () {
    document.documentElement.classList.add('no-scroll')
  },
  destroyed () {
    document.documentElement.classList.remove('no-scroll')
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
  mixins: [coreComponent('Overlay')]
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 3;
}
</style>

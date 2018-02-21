<template>
  <div class="overlay fixed w-100" @click="close" v-if="isVisible" />
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
    }
  },
  mixins: [coreComponent('Overlay')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$black: map-get($colors, black);

.overlay {
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba($black, 0.4);
  z-index: 3;
}
</style>

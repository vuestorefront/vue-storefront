<template>
  <div class="overlay t-fixed t-w-full" @click="close" v-if="isVisible" />
</template>

<script>
import Overlay from '@vue-storefront/core/compatibility/components/Overlay'

export default {
  computed: {
    isVisible () {
      return this.$store.state.ui.overlay
    }
  },
  methods: {
    close () {
      this.$store.dispatch('ui/closeAll')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/base/global_vars';
$color-bg: color(black);
$z-index-overlay: map-get($z-index, overlay);

.overlay {
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba($color-bg, 0.4);
  z-index: $z-index-overlay;
}
</style>

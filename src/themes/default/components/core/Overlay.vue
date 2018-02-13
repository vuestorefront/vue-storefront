<template>
  <div class="overlay fixed w-100" @click="close" v-if="isVisible" />
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/Overlay')]
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

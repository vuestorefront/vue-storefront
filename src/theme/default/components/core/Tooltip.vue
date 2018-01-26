<template>
  <span class="tooltip relative">
    <i class="material-icons icon c-darkgray">info</i>
    <div class="text absolute p25 h5 bg-darkgray c-white">
      <slot />
    </div>
  </span>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/SizeButton')]
}
</script>

<style lang="scss" scoped>
@import '~theme/css/global_vars';
$darkgray: map-get($colors, darkgray);

.tooltip {
  cursor: default;

  &:hover .text {
    display: block;
  }
}

.icon {
  vertical-align: bottom;
}

.text {
  display: none;
  left: 50%;
  transform: translateX(-50%);
  bottom: 35px;
  box-sizing: border-box;
  width: 200px;
  text-align: center;

  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border: 10px solid transparent;
    border-top: 10px solid $darkgray;
    left: 50%;
    transform: translateX(-50%);
    bottom: -20px;
  }
}
</style>

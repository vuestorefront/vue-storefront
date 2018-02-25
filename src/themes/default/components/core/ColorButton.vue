<template>
  <button
    class="mr10 mb5 bg-transparent brdr-1 brdr-circle brdr-cl-transparent relative inline-flex pointer color"
    @click="switchFilter(id, label)"
    :class="{ active: active }"
    :aria-label="$t('Select color ') + label"
  >
    <div
      class="absolute brdr-circle brdr-1 brdr-cl-brdr-secondary block color-inside"
      :style="colorFrom(label)"
    />
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  methods: {
    colorFrom (label) {
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    }
  },
  mixins: [coreComponent('ColorButton')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $lightgray-secondary: map-get($colors, lightgray-secondary);
  $emperor: map-get($colors, emperor);

  .color {
    width: 40px;
    height: 40px;

    &:hover,
    &:focus {
      border-color: $lightgray-secondary;
    }

    &.active {
      border-color: $emperor;
    }
  }

  .color-inside {
    width: 34px;
    height: 34px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%)
  }
</style>

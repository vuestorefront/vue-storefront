<template>
  <button
    :class="['mr10 mb5 bg-cl-transparent brdr-1 brdr-circle brdr-cl-transparent :brdr-cl-bg-primary relative inline-flex pointer color', active ? 'active' : '']"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select color ') + label"
  >
    <div
      class="absolute brdr-circle brdr-1 brdr-cl-secondary block color-inside"
      :style="colorFrom(label)"
    />
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/components/GenericSelector'

export default {
  mixins: [GenericSelector],
  methods: {
    colorFrom (label) {
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(primary);

  .color {
    width: 40px;
    height: 40px;

    &.active {
      border-color: $color-active;
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

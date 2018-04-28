<template>
  <button
    :class="{'active': active, 'p0': true, 'bg-cl-primary': true, 'brdr-1': true, 'brdr-cl-primary': true, 'brdr-square': true, 'h5': true, 'cl-tertiary': true, 'generic-selector': true}"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
  >
    {{ label }}
  </button>
</template>

<script>
import coreComponent from 'core/lib/themes'
export default {
  mixins: coreComponent('GenericSelector')
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .generic-selector {
    height: 40px;
    padding-left: 8px;
    padding-right: 8px;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &.active {
      border-color: $color-active;
      border-width: 2px;
      color: $color-active;
    }

    &:disabled {
      border-color: $color-disabled;
      color: $color-disabled;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
    }
  }
</style>


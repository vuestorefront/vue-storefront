<template>
  <button
    class="
      p0 bg-cl-primary brdr-1 brdr-cl-primary
      brdr-square h5 cl-tertiary size-selector
    "
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/components/GenericSelector'

export default {
  mixins: [GenericSelector]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-active: color(secondary);
  $color-disabled: color(secondary, $colors-border);

  .size-selector {
    width: 40px;
    height: 40px;

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

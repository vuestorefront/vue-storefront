<template>
  <button
    class="
      p0 bg-cl-primary brdr-1 brdr-cl-primary
      brdr-square h5 c-lightgray-secondary size-button
    "
    :class="{ active: active }"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select size ') + label"
  >
    {{ label }}
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('SizeButton')]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/base/global_vars';
  $gray-secondary: map-get($colors, gray-secondary);
  $alto: map-get($colors, alto);

  .size-button {
    width: 40px;
    height: 40px;

    &:hover,
    &:focus {
      border-width: 2px;
    }

    &.active {
      border-color: $gray-secondary;
      border-width: 2px;
      color: $gray-secondary;
    }

    &:disabled {
      border-color: $alto;
      color: $alto;
      cursor: not-allowed;

      &:hover,
      &:after {
        border-width: 1px;
      }
    }
  }
</style>

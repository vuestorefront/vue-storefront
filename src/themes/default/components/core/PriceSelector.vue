<template>
  <div @click="$emit('change', variant)">
    <button
      class="relative brdr-cl-bg-tertiary brdr-1 bg-cl-transparent mr10 pointer price-selector"
      :class="{ active: isActive }"
      :aria-label="$t('Price {variant}', { variant: variant.label })"
    >
      <span class="bg-cl-transparent absolute block square" />
    </button>
    <span>{{ variant.label }}</span>
  </div>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts'

export default {
  mixins: [filterMixin]
}
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-event: color(tertiary);
  $color-active: color(accent);

  .price-selector {
    width: 20px;
    height: 20px;

    &:hover {
      .square {
        background-color: $color-event;
      }
    }

    &.active {
      .square {
        background-color: $color-active;
      }
    }
  }

  .square {
    width: 80%;
    height: 80%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
</style>

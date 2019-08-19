<template>
  <button
    type="button"
    class="relative bg-cl-transparent brdr-none inline-flex"
    @click="openMicrocart"
    data-testid="openMicrocart"
    :aria-label="$t('Open microcart')"
  >
    <i class="material-icons">shopping_cart</i>
    <span
      class="minicart-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 cl-white bg-cl-silver"
      v-cloak
      v-show="totalQuantity"
      data-testid="minicartCount"
    >
      {{ totalQuantity }}
    </span>
  </button>
</template>

<script>
import MicrocartIcon from '@vue-storefront/core/compatibility/components/blocks/Header/MicrocartIcon'

export default {
  mixins: [MicrocartIcon]
}
</script>

<style scoped>
  .minicart-count {
    top: 7px;
    left: 50%;
    min-width: 16px;
    min-height: 16px;
    border-radius: 10px;
  }
</style>

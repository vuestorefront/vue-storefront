<template>
  <button class="relative bg-transparent brdr-none inline-flex" @click="openMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span
      class="minicart-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 c-white bg-lightgray-secondary"
      v-cloak
      v-if="totals.quantity"
    >
      {{ totals.quantity }}
    </span>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
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

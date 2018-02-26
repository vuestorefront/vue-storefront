<template>
  <div class="relative inline-flex" @click="openMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span
      class="minicart-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 cl-white bg-cl-silver"
      v-cloak
      v-if="totalQuantity"
    >
      {{ totalQuantity }}
    </span>
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Header/MicrocartIcon')]
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

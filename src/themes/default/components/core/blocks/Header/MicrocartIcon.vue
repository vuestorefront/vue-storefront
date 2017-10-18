<template>
  <div class="microcart-icon" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
}
</script>

<style scoped>
  .microcart-icon {
    display: inline-flex;
  }

  .minicart-count {
    position: relative;
    top: -5px;
    left: -5px;
    width: 16px;
    height: 16px;
  }
</style>

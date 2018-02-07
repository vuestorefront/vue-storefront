<template>
  <div class="microcart-icon inline-flex" @click="openMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span class="minicart-count flex brdr-circle h6 lh16 weight-700 c-white bg-lightgray-secondary" v-cloak v-if="totals.quantity">{{ totals.quantity }}</span>
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
    position: relative;
  }

  .minicart-count {
    position: absolute;
    top: 10px;
    right: 5px;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
  }
</style>

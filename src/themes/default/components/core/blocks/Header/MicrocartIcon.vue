<template>
  <div class="microcart-icon inline-flex" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
    <span class="minicart-count brdr-circle fs-10 weight-700 bg-gray c-white" v-cloak>{{totals.quantity}}</span>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
}
</script>

<style lang="scss" scoped>
  
</style>

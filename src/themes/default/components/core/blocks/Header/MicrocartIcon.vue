<template>
  <div class="microcart-icon" @click="toggleMicrocart">
    <i class="material-icons md-18">shopping_cart</i>
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  data () {
    return {
      total: 3
    }
  },
  mixins: [coreComponent('core/blocks/Header/MicrocartIcon')]
}
</script>

<style scoped>
  .microcart-icon {
    display: inline-flex;
  }
</style>

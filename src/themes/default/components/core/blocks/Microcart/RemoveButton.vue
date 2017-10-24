<template>
  <button class="brdr-none bg-transparent">
    <i class="material-icons">remove_shopping_cart</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Microcart/RemoveButton')]
}
</script>

<style scoped>
  button:hover {
    cursor: pointer;
  }
</style>
<template>
  <button class="brdr-none bg-transparent">
    <i class="material-icons">mode_edit</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Microcart/EditButton')]
}
</script>

<style scoped>
  button:hover {
    cursor: pointer;
  }
</style>
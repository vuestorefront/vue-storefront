<template>
  <button class="brdr-none bg-transparent">
    Edit <i class="material-icons h6">mode_edit</i>
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
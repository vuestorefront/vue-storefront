<template>
  <button class="brdr-none bg-transparent p0 inline-flex c-gray-secondary">
    <span class="hidden-xs h6 weight-300">
      Edit
    </span>
    <i class="material-icons h4 p5 pr0">mode_edit</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/blocks/Microcart/EditButton')]
}
</script>

<style scoped>
  button {
    align-items: center;
  }
</style>

<template>
  <button class="brdr-none bg-transparent">
    Edit i
  </button>  
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('core/ui/EditButton')]
}
</script>

<style scoped>
  button:hover {
    cursor: pointer;
  }
</style>
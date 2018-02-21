<template>
  <button class="brdr-none bg-transparent">
    <i class="material-icons h4">close</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('blocks/Compare/RemoveButton')]
}
</script>

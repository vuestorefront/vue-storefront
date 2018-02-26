<template>
  <button class="brdr-none bg-cl-th-transparent">
    <i class="material-icons h4">close</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Compare/RemoveButton')]
}
</script>

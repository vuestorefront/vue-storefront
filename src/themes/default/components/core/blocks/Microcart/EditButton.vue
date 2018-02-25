<template>
  <button class="middle-xs brdr-none bg-transparent p0 inline-flex c-gray-secondary">
    <span class="hidden-xs h6 weight-300">
      {{ $t('Edit') }}
    </span>
    <i class="material-icons h4 p5 pr0">mode_edit</i>
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('blocks/Microcart/EditButton')]
}
</script>

<template>
  <button class="brdr-none bg-transparent p0 middle-xs inline-flex c-gray-secondary">
    <span class="hidden-xs h6 weight-300">
      {{ $t('Remove') }}
    </span>
    <i class="material-icons h4 p5 pr0">remove_shopping_cart</i>
  </button>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  mixins: [coreComponent('blocks/Microcart/RemoveButton')]
}
</script>

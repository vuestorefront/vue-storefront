<template>
  <div class="t-flex t-flex-grow t-w-1/3 t-max-w-1/2 t-px-1 t-mb-2">
    <generic-selector v-bind="$props" v-on="$listeners" class="t-w-full">
      {{ option.label }}
    </generic-selector>
  </div>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin'
import GenericSelector from 'theme/components/core/blocks/Category/Filter/GenericSelector'

export default {
  name: 'GenderSelector',
  mixins: [filterMixin],
  components: {
    GenericSelector
  }
}
</script>

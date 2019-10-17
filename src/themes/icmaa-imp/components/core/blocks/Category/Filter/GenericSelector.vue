<template>
  <button-component @click="$emit('change', option)" :type="isActive ? 'tag-active' : 'tag'" :aria-label="option.label">
    {{ option.label }}
  </button-component>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin'
import ButtonComponent from 'theme/components/core/blocks/Button'

export default {
  name: 'GenericSelector',
  mixins: [filterMixin],
  components: {
    ButtonComponent
  }
}
</script>

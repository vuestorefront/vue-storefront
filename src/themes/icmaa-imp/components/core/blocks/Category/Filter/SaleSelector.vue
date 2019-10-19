<template>
  <button-component @click="$emit('change', option)" type="sale" :icon="isActive ? 'check' : 'local_offer'" icon-position="left" :aria-label="option.label">
    {{ $t('In sale') }}
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

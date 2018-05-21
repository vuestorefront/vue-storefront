<template>
  <button
    :class="{'active': active}"
    @click="switchFilter(id, label)"
    :aria-label="$t('Select ' + label)"
  >
    {{ label }}
  </button>
</template>

<script>
import GenericSelector from 'core/components/genericSelector'

export default {
  mixins: [GenericSelector]
}
</script>

<style lang="scss" scoped>
.active {
  background: lightgray;
}
</style>

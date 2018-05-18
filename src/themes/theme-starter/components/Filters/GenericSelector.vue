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
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('GenericSelector')]
}
</script>

<style lang="scss" scoped>
.active {
  background: lightgray;
}
</style>

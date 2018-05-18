<template>
  <span @click="switchFilter(id, from, to)">
    <button
      :class="{ active: active }"
      :aria-label="$t('Price ') + content"
    >
      {{ content }}
    </button>
  </span>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  name: 'PriceSelector',
  mixins: [coreComponent('PriceSelector')]
}
</script>

<style lang="scss" scoped>
.active {
  background: lightgray;
}
</style>

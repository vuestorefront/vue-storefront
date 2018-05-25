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
import PriceSelector from 'core/components/PriceSelector'

export default {
  name: 'PriceSelector',
  mixins: [PriceSelector]
}
</script>

<style lang="scss" scoped>
.active {
  background: lightgray;
}
</style>

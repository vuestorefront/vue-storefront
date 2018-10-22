<template>
  <button
    @click="switchFilter(id, label)"
    :class="{ active: active }"
    :aria-label="$t('Select color ') + label"
  >
    <div
      :style="colorFrom(label)"
    />
  </button>
</template>

<script>
import GenericSelector from '@vue-storefront/core/components/GenericSelector'

export default {
  methods: {
    // This method adds visual color filter background.
    colorFrom (label) {
      if (label && label.toString().indexOf(',') >= 0) {
        return 'background: linear-gradient(' + label + ')'
      } else {
        return 'background-color: ' + label
      }
    }
  },
  mixins: [GenericSelector]
}
</script>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
  padding: 2px;
  border-radius: 50%;
  border: 1px solid transparent;
  & > div {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}
.active {
  border: 1px solid lightgray;
}
</style>

<template>
  <button
    class="button-full block brdr-none w-100 px10 py20 bg-darkgray ripple weight-400 h4 c-white"
    :type="type"
    v-focus-clean="{class: 'no-outline'}"
  >
    <slot>
      Button
    </slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonFull',
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
$emperor: map-get($colors, emperor);

.button-full {
  &:hover,
  &:focus {
    background-color: $emperor;
  }
}
</style>

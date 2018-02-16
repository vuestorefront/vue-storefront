<template>
  <button
    class="button-full block brdr-none w-100 px55 py20 ripple weight-400 h4 bg-black c-white"
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
$darkgray: map-get($colors, darkgray);

.button-full {
  &:hover,
  &:focus {
    background-color: $darkgray;
  }
}
</style>

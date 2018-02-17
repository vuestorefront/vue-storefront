<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : false"
    :to="link"
    class="no-outline button-full block brdr-none w-100 px10 py20 bg-darkgray ripple weight-400 h4 c-white"
    :class="{ 'no-underline pointer align-center border-box': tag != 'button' }"
    v-focus-clean="{ class: 'no-outline' }"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
export default {
  name: 'ButtonFull',
  props: {
    tag: {
      type: String,
      required: false,
      default: 'button'
    },
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
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

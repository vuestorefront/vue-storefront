<template>
  <component
    :is="link ? 'router-link' : 'button'"
    :type="!link ? type : false"
    :to="link"
    class="no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium"
    :class="{ 'no-underline pointer align-center border-box': link }"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonFull',
  directives: { focusClean },
  props: {
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
  .button-full {
    min-width: 250px;
  }
</style>

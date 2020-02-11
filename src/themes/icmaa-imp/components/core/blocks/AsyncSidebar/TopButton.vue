<template>
  <button class="t-flex t-flex-fix t-px-2 t-cursor-pointer">
    <material-icon :icon="icon" />
    <span class="t-sr-only t-sr-only-focusable" :tabindex="tabIndex" :text="$t(text)" />
  </button>
</template>

<script>
import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'SidebarMenu',
  props: {
    icon: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    tabIndex: {
      type: Number,
      default: 1
    }
  },
  components: {
    MaterialIcon
  }
}
</script>

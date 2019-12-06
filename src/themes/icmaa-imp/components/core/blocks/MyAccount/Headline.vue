<template>
  <h1 class="t-flex t-flex-wrap t-items-center t-mt-2 t-mb-6 t-text-2xl t-leading-tight">
    <material-icon :icon="icon" size="md" class="t-mr-2" />
    <slot />
  </h1>
</template>

<script>

import MaterialIcon from 'theme/components/core/blocks/MaterialIcon'

export default {
  name: 'ProfileHeadline',
  components: {
    MaterialIcon
  },
  props: {
    icon: {
      type: String,
      default: 'account_circle'
    }
  }
}

</script>

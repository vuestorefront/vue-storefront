<template>
  <h1 class="t-flex t-items-center t-mt-2 t-mb-6 t-text-2xl">
    <material-icon :icon="icon" size="lg" class="t-mr-2" />
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

<template>
  <button>
    <!--
        Filter button for category color
        props:
        "label" - text displayed at filter
        "id" - filter ID
        "code" - filter code
        "context"
        data to display:
        {{ label }}
      -->
  </button>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  mixins: [coreComponent('GenericSelector')]
}
</script>

<style lang="scss" scoped>
</style>

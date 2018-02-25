<template>
  <div class="validation-error c-red h6">
    DONT USE THERE WILL BE CHANGES IN API
  </div>
</template>

<script>
import { coreComponent } from 'core/lib/themes'

export default {
  name: 'ValidationError',
  mixins: [coreComponent('ValidationError')]
}
</script>

<template>
  <div class="validation-error c-red h6">
    DONT USE THERE WILL BE CHANGES IN API
  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

export default {
  name: 'ValidationError',
  mixins: [coreComponent('core/ValidationError')]
}
</script>
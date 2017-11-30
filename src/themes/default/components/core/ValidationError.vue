<template>
  <div class="validation-error c-red h6">

  </div>
</template>

<script>
import { coreComponent } from 'lib/themes'

  export default {
    name: 'validation-error',
    mixins: [coreComponent('core/ValidationError')]
  }
</script>
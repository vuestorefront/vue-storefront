<template>
  <div class="validation-error cl-error h6">
    DONT USE THERE WILL BE CHANGES IN API
  </div>
</template>

<script>
import ValidationError from 'core/components/ValidationError'

export default {
  name: 'ValidationError',
  mixins: [ValidationError]
}
</script>

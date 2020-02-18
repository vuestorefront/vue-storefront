<template>
  <div v-if="filteredValidations.length > 0" class="validation-message t-w-full" :class="[ validationsAsTooltip ? 't-hidden t-absolute t-mt-10 t-p-2 t-top-0 t-z-10 t-bg-white' : 't-mt-2' ]" data-test-id="ValidationMessages">
    <span v-for="(validation, index) in filteredValidations" :key="index" class="t-block t-text-sm t-italic t-text-alert" data-test-id="errorMessage">
      {{ validation.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ValidationMessages',
  props: {
    validations: {
      type: Array,
      default: () => []
    },
    validationsAsTooltip: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    filteredValidations () {
      return this.validations.filter(v => v.condition)
    }
  }
}
</script>

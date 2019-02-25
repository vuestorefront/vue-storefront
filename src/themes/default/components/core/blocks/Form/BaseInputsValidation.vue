<template>
  <div>
    <template v-if="validation">
      <span class="block cl-error h6 mt8" v-if="validation.condition">
        {{ validation.text }}
      </span>
    </template>
    <template v-else-if="validations">
      <span
        v-for="(validation, index) in validations"
        :key="index"
        v-if="validation.condition"
        class="block cl-error h6 mt8"
        data-testid="errorMessage"
      >
        {{ validation.text }}
      </span>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    validation: {
      type: Object,
      required: false,
      default: () => { }
    },
    validations: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>

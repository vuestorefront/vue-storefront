<template>
  <label :for="formId" class="t-text-sm" :class="{ 't-block t-mb-2': isHorizontal, '': isVertical }">
    {{ labelText }}
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',
  props: {
    formId: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validation: (value) => {
        return ['horizontal', 'vertical'].includes(value)
      }
    }
  },
  computed: {
    isHorizontal () {
      return this.direction === 'horizontal'
    },
    isVertical () {
      return this.direction === 'vertical'
    }
  }
}
</script>

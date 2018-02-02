<template>
  <button>
    Core color button
  </button>
</template>

<script>
export default {
  name: 'ColorButton',
  props: {
    label: {
      type: null,
      default: ''
    },
    id: {
      type: null,
      default: ''
    },
    code: {
      type: null,
      default: ''
    },
    context: {
      type: null,
      default: ''
    }
  }
}
</script>

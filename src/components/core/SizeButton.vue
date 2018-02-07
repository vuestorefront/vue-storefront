<template>
  <button>
    <!--
        Filter button for category size
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
export default {
  name: 'SizeButton',
  props: {
    label: {
      type: null,
      required: false,
      default: () => false
    },
    id: {
      type: null,
      required: false,
      default: () => false
    },
    code: {
      type: null,
      required: false,
      default: () => false
    },
    context: {
      type: null,
      required: false,
      default: () => false
    }
  }
}
</script>
